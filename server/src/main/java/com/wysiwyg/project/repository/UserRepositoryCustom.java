package com.wysiwyg.project.repository;

import com.wysiwyg.project.dto.UserFetchDto;
import com.wysiwyg.project.dto.UserSearchCondition;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserRepositoryCustom {

    Page<UserFetchDto> searchByUserName(UserSearchCondition condition, Pageable pageable);
    UserFetchDto searchById(UserSearchCondition condition);
}
