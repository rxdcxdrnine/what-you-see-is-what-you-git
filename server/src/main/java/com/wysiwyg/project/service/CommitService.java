package com.wysiwyg.project.service;

import com.wysiwyg.project.dto.CommitFetchDto;
import com.wysiwyg.project.entity.Commit;
import com.wysiwyg.project.repository.CommitFileRepository;
import com.wysiwyg.project.repository.CommitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommitService {

    private final CommitRepository commitRepository;

    public List<CommitFetchDto> findByPostId(Long postId) {
        List<Commit> commits = commitRepository.searchByPostId(postId);
        return commits.stream().map(CommitFetchDto::new).collect(Collectors.toList());
    }
}
