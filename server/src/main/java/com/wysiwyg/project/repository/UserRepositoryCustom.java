package com.wysiwyg.project.repository;

import com.wysiwyg.project.dto.UserFetchDto;
import com.wysiwyg.project.dto.UserSearchCondition;

import java.util.List;

public interface UserRepositoryCustom {

    List<UserFetchDto> searchByUserName(UserSearchCondition condition);
    UserFetchDto searchById(UserSearchCondition condition);
}
