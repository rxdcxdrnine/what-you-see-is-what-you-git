package com.wysiwyg.project.service;

import com.wysiwyg.project.dto.UserFetchDto;
import com.wysiwyg.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserFetchDto searchByGithubId(Long githubId) {
        return userRepository.searchByUserId(githubId);
    }

}
