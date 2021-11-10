package com.wysiwyg.project.service;

import com.wysiwyg.project.dto.GistPostFetchDto;
import com.wysiwyg.project.dto.GistPostSaveDto;
import com.wysiwyg.project.entity.Gist;
import com.wysiwyg.project.entity.User;
import com.wysiwyg.project.repository.GistPostRepository;
import com.wysiwyg.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GistPostService {

    private final GistPostRepository gistPostRepository;
    private final UserRepository userRepository;

    @Transactional
    public void save(GistPostSaveDto dto) {
        // find user
        Optional<User> user = userRepository.findById(dto.getUserId());

        // save gist
        Gist gist = dto.toEntity(user.get());
        gistPostRepository.save(gist);
    }

    public List<GistPostFetchDto> findByUserId(Long userId) {
        List<Gist> gists = gistPostRepository.findByUserUserId(userId);
        return gists.stream().map(GistPostFetchDto::new).collect(Collectors.toList());
    }
}
