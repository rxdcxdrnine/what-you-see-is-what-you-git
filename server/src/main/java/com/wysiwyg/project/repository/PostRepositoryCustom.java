package com.wysiwyg.project.repository;

import com.wysiwyg.project.dto.PostCountDto;
import com.wysiwyg.project.dto.PostFetchDto;
import com.wysiwyg.project.dto.PostSearchCondition;

import java.util.List;

public interface PostRepositoryCustom {

    List<PostCountDto> countByDate(Long userId);
    List<PostFetchDto> searchByUserId(PostSearchCondition condition);
}
