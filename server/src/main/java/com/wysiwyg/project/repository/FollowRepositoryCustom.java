package com.wysiwyg.project.repository;

import com.wysiwyg.project.dto.FollowFetchDto;
import com.wysiwyg.project.dto.FollowSaveDto;

import java.util.List;

public interface FollowRepositoryCustom {

    public void create(FollowSaveDto dto);
    public boolean isExist(FollowSaveDto dto);
    public List<FollowFetchDto> findFollowersByFollowingId(Long followingId);
    public List<FollowFetchDto> findFollowingsByFollowerId(Long followerId);
}
