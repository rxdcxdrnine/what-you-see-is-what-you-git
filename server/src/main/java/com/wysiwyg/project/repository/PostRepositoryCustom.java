package com.wysiwyg.project.repository;

import com.wysiwyg.project.dto.PostCountDto;
import com.wysiwyg.project.dto.PostFetchDto;
import com.wysiwyg.project.dto.PostSearchCondition;
import com.wysiwyg.project.dto.UserSearchCondition;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PostRepositoryCustom {

    PostFetchDto searchByPostId(Long postId);
    List<PostCountDto> countByDate(UserSearchCondition condition);
    Page<PostFetchDto> searchByUserId(PostSearchCondition condition, Pageable pageable);
}
