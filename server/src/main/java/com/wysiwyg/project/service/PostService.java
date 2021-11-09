package com.wysiwyg.project.service;

import com.wysiwyg.project.dto.PostCountFetchDto;
import com.wysiwyg.project.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    public List<PostCountFetchDto> countByDate(Long userId) {
        return postRepository.countByDate(userId);
    }
}
