package com.wysiwyg.project.service;

import com.wysiwyg.project.dto.GistPostFetchDto;
import com.wysiwyg.project.dto.GistPostSaveDto;
import com.wysiwyg.project.entity.Gist;
import com.wysiwyg.project.entity.GistFile;
import com.wysiwyg.project.repository.GistFileRepository;
import com.wysiwyg.project.repository.GistPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GIstPostService {

    private final GistPostRepository gistPostRepository;
    private final GistFileRepository gistFileRepository;

    @Transactional
    public void save(GistPostSaveDto dto) {
        // save gist
        Gist gist = dto.toEntity();
        gistPostRepository.save(gist);

        // save gist files
        for (String filename : dto.getGistFilenames()) {
            GistFile gistFile = GistFile.builder()
                    .gistFilename(filename)
                    .build();
            gistFileRepository.save(gistFile);
        }
    }

    public List<GistPostFetchDto> findByUserId(Long userId) {
        List<Gist> gists = gistPostRepository.findByUserUserId(userId);
        return gists.stream().map(GistPostFetchDto::new).collect(Collectors.toList());
    }
}
