package com.wysiwyg.project.controller;

import com.wysiwyg.project.dto.*;
import com.wysiwyg.project.service.CommitService;
import com.wysiwyg.project.service.GistPostService;
import com.wysiwyg.project.service.ImagePostService;
import com.wysiwyg.project.service.PushPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
public class PostController {

    private final PushPostService pushPostService;
    private final GistPostService gistPostService;
    private final ImagePostService imagePostService;
    private final CommitService commitService;

    @GetMapping("/push")
    public List<PushPostFetchDto> fetchPushPost(@RequestParam(required = true) Long userId) {
        return pushPostService.findByUserId(userId);
    }

    @GetMapping("/commit")
    public List<CommitFetchDto> fetchCommits(@RequestParam(required = true) Long postId) {
        return commitService.findByPostId(postId);
    }

    @PostMapping("/push")
    public void savePushPost(@RequestBody PushPostSaveDto dto) {
        pushPostService.save(dto);
    }

    @GetMapping("/gist")
    public List<GistPostFetchDto> fetchGistPost(@RequestParam(required = true) Long userId) {
        return gistPostService.findByUserId(userId);
    }

    @PostMapping("/gist")
    public void saveGistPost(@RequestBody GistPostSaveDto dto) {
        gistPostService.save(dto);
    }

    @GetMapping("/image")
    public List<ImagePostFetchDto> fetchImagePost(@RequestParam(required = true) Long userId) {
        return imagePostService.findByUserId(userId);
    }

    @PostMapping("/image")
    public void saveImagePost(ImagePostSaveDto dto) {
        imagePostService.save(dto);
    }
}
