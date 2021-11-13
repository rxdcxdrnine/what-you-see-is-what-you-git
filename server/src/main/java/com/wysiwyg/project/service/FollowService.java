package com.wysiwyg.project.service;

import com.wysiwyg.project.dto.FollowFetchDto;
import com.wysiwyg.project.dto.FollowSaveDto;
import com.wysiwyg.project.dto.UserFetchDto;
import com.wysiwyg.project.dto.UserSearchCondition;
import com.wysiwyg.project.entity.Follow;
import com.wysiwyg.project.entity.User;
import com.wysiwyg.project.repository.FollowRepository;
import com.wysiwyg.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FollowService {

    private final FollowRepository followRepository;
    private final UserRepository userRepository;

    @Transactional
    public void save(FollowSaveDto dto) {
        followRepository.create(dto);
    }

    // find following = find followers by following id
    public List<FollowFetchDto> findFollowingByUserId(Long userId) {
        return followRepository.findFollowersByFollowingId(userId);
    }

    // find follower = find followings by follower id
    public List<FollowFetchDto> findFollowerByUserId(Long userId) {
        return followRepository.findFollowingsByFollowerId(userId);
    }

    public List<UserFetchDto> searchUsers(UserSearchCondition condition) {
        return userRepository.searchByUserName(condition);
    }

    @Transactional
    public void delete(Long followId) {
        followRepository.delete(followId);
    }
}
