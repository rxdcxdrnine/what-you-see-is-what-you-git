package com.wysiwyg.project.repository;

import com.wysiwyg.project.dto.UserFetchDto;

import java.util.List;

public interface UserRepositoryCustom {

    List<UserFetchDto> searchByUserName(String userName);
    UserFetchDto searchByUserId(Long githubId);
}
