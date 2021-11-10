package com.wysiwyg.project.service;

import com.wysiwyg.project.dto.PostCountDto;
import com.wysiwyg.project.dto.PostFetchDto;
import com.wysiwyg.project.dto.PostSearchCondition;
import com.wysiwyg.project.repository.PostRepository;
import com.wysiwyg.project.repository.PostRepositoryCustomImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    public List<PostCountDto> countByDate(Long userId) {
        return postRepository.countByDate(userId);
    }

    public List<PostFetchDto> searchByUserId(PostSearchCondition condition) {
        return postRepository.searchByUserId(condition);
    }

    @Transactional
    public void delete(Long postId) {
        postRepository.deleteByPostId(postId);
    }
}
