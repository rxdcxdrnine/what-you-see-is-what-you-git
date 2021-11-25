package com.wysiwyg.project.service;

import com.wysiwyg.project.dto.*;
import com.wysiwyg.project.entity.Post;
import com.wysiwyg.project.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    public PostFetchDto searchByPostId(Long postId) {
        return postRepository.searchByPostId(postId);
    }

    public List<PostCountDto> countByDate(UserSearchCondition condition) {
        return postRepository.countByDate(condition);
    }

    public Page<PostFetchDto> searchByUserId(PostSearchCondition condition, Pageable pageable) {
        return postRepository.searchByUserId(condition, pageable);
    }

    @Transactional
    public void update(Long postId, PostUpdateDto dto) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new Error("NOT FOUND"));

        post.setMarkdown(dto.getMarkdown());
        postRepository.save(post);
    }

    @Transactional
    public void delete(Long postId) {
        postRepository.deleteByPostId(postId);
    }
}
