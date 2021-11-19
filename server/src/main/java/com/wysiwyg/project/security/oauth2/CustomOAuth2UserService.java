package com.wysiwyg.project.security.oauth2;

import com.wysiwyg.project.entity.User;
import com.wysiwyg.project.repository.UserRepository;
import com.wysiwyg.project.security.UserPrincipal;
import com.wysiwyg.project.security.exception.OAuth2AuthenticationProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());
        if(StringUtils.isEmpty(oAuth2UserInfo.getId())) {
            throw new OAuth2AuthenticationProcessingException("Id not found from OAuth2 provider");
        }

        Optional<User> userOptional = userRepository.findByGithubId(oAuth2UserInfo.getId());
        User user;

        if(userOptional.isPresent()) {
            user = userOptional.get();
            user = updateExistingUser(user, oAuth2UserInfo);
        } else {
            user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        }

        return UserPrincipal.create(user, oAuth2User.getAttributes());
    }

    @Transactional
    public User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
        User user = User.builder()
                .githubId(oAuth2UserInfo.getId())
                .userName(oAuth2UserInfo.getUserName())
                .profileName(oAuth2UserInfo.getProfileName())
                .avatarUrl(oAuth2UserInfo.getImageUrl())
                .build();

        return userRepository.save(user);
    }

    @Transactional
    public User updateExistingUser(User existingUser, OAuth2UserInfo oAuth2UserInfo) {
        existingUser.setUserName(oAuth2UserInfo.getUserName());
        existingUser.setProfileName(oAuth2UserInfo.getProfileName());
        existingUser.setAvatarUrl(oAuth2UserInfo.getImageUrl());

        return userRepository.save(existingUser);
    }
}
