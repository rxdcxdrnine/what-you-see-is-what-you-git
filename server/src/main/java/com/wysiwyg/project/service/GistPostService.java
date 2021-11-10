package com.wysiwyg.project.service;

import com.wysiwyg.project.dto.GistPostFetchDto;
import com.wysiwyg.project.dto.GistPostSaveDto;
import com.wysiwyg.project.entity.Gist;
import com.wysiwyg.project.repository.GistPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GistPostService {

    private final GistPostRepository gistPostRepository;

    @Transactional
    public void save(GistPostSaveDto dto) {
        Gist gist = dto.toEntity();
        gistPostRepository.save(gist);
    }

    public List<GistPostFetchDto> findByUserId(Long userId) {
        List<Gist> gists = gistPostRepository.findByUserUserId(userId);
        return gists.stream().map(GistPostFetchDto::new).collect(Collectors.toList());
    }
}
