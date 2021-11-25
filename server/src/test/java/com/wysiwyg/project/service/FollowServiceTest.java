package com.wysiwyg.project.service;

import com.wysiwyg.project.dto.FollowFetchDto;
import com.wysiwyg.project.dto.FollowSaveDto;
import com.wysiwyg.project.entity.User;
import com.wysiwyg.project.repository.FollowRepository;
import com.wysiwyg.project.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class FollowServiceTest {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private FollowService followService;

    private User createUser(Long githubId, String userName, String profileName, String avatarUrl) {
        return User.builder()
                .githubId(githubId)
                .userName(userName)
                .profileName(profileName)
                .avatarUrl(avatarUrl)
                .build();
    }

    @Test
    @Transactional
    public void findFollowingTest() {
        User userA = createUser(50660684L, "rxdcxdrnine", "Kang Changgu", "https://avatars.githubusercontent.com/u/50660684?v=4");
        User userB = createUser(45425838L, "handal95", "SangilHan", "https://avatars.githubusercontent.com/u/45425838?v=4");
        User userC = createUser(32982728L, "beeetea", "Lee Ho Jun", "https://avatars.githubusercontent.com/u/32982728?v=4");
        User userD = createUser(43772472L, "gyuZzang", "GyuZzang", "https://avatars.githubusercontent.com/u/43772472?v=4");

        userRepository.save(userA);
        userRepository.save(userB);
        userRepository.save(userC);
        userRepository.save(userD);

        FollowSaveDto dto1 = new FollowSaveDto(userA.getUserId(), userB.getUserId());
        FollowSaveDto dto2 = new FollowSaveDto(userA.getUserId(), userC.getUserId());

        followService.save(dto1);
        followService.save(dto2);

        List<FollowFetchDto> userA_following = followService.findFollowingByUserId(userA.getUserId());

        assertThat(userA_following)
                .extracting("userId")
                .contains(userB.getUserId(), userC.getUserId());
    }

    @Test
    @Transactional
    public void findFollowerTest() {
        User userA = createUser(50660684L, "rxdcxdrnine", "Kang Changgu", "https://avatars.githubusercontent.com/u/50660684?v=4");
        User userB = createUser(45425838L, "handal95", "SangilHan", "https://avatars.githubusercontent.com/u/45425838?v=4");
        User userC = createUser(32982728L, "beeetea", "Lee Ho Jun", "https://avatars.githubusercontent.com/u/32982728?v=4");
        User userD = createUser(43772472L, "gyuZzang", "GyuZzang", "https://avatars.githubusercontent.com/u/43772472?v=4");

        userRepository.save(userA);
        userRepository.save(userB);
        userRepository.save(userC);
        userRepository.save(userD);

        FollowSaveDto dto1 = new FollowSaveDto(userB.getUserId(), userA.getUserId());
        FollowSaveDto dto2 = new FollowSaveDto(userC.getUserId(), userA.getUserId());

        followService.save(dto1);
        followService.save(dto2);

        List<FollowFetchDto> userA_follower = followService.findFollowerByUserId(userA.getUserId());

        assertThat(userA_follower)
                .extracting("userId")
                .contains(userB.getUserId(), userC.getUserId());
    }
}