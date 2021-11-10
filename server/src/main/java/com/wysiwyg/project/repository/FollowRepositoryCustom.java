package com.wysiwyg.project.repository;

import com.wysiwyg.project.dto.FollowFetchDto;
import com.wysiwyg.project.dto.FollowSaveDto;

import java.util.List;

public interface FollowRepositoryCustom {

    void create(FollowSaveDto dto);
    boolean isExist(FollowSaveDto dto);
    void delete(Long followId);
    List<FollowFetchDto> findFollowersByFollowingId(Long followingId);
    List<FollowFetchDto> findFollowingsByFollowerId(Long followerId);
}
