package com.wysiwyg.project.service;

import com.wysiwyg.project.dto.*;
import com.wysiwyg.project.entity.Post;
import com.wysiwyg.project.repository.PostRepository;
import com.wysiwyg.project.repository.PostRepositoryCustomImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

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

    public List<PostFetchDto> searchByUserId(PostSearchCondition condition) {
        return postRepository.searchByUserId(condition);
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
