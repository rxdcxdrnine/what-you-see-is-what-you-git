package com.wysiwyg.project.controller;

import com.wysiwyg.project.dto.*;
import com.wysiwyg.project.service.*;
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
    private final PostService postService;

    @GetMapping("/{id}")
    public PostFetchDto fetchPost(@PathVariable(value = "id") Long postId) {
        return postService.searchByPostId(postId);
    }

    @PutMapping("/{id}")
    public void updatePost(
            @PathVariable(value = "id") Long postId,
            @RequestBody PostUpdateDto dto)
    {
        postService.update(postId, dto);
    }


    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable(value = "id") Long postId) {
        postService.delete(postId);
    }

    @GetMapping("/all")
    public List<PostFetchDto> fetchAllPosts(
            @RequestParam(required = true) Long userId,
            @RequestParam(required = false) String regDate
    ) {
        return postService.searchByUserId(new PostSearchCondition(userId, regDate));
    }

    @GetMapping("/push")
    public List<PushPostFetchDto> fetchPushPosts(@RequestParam(required = true) Long userId) {
        return pushPostService.findByUserId(userId);
    }

    @GetMapping("/commit")
    public List<CommitFetchDto> fetchCommits(@RequestParam(required = true) Long postId) {
        return commitService.findByPostId(postId);
    }

    @GetMapping("/gist")
    public List<GistPostFetchDto> fetchGistPosts(@RequestParam(required = true) Long userId) {
        return gistPostService.findByUserId(userId);
    }

    @GetMapping("/image")
    public List<ImagePostFetchDto> fetchImagePosts(@RequestParam(required = true) Long userId) {
        return imagePostService.findByUserId(userId);
    }

    @PostMapping("/push")
    public void savePushPost(@RequestBody PushPostSaveDto dto) {
        pushPostService.save(dto);
    }

    @PostMapping("/gist")
    public void saveGistPost(@RequestBody GistPostSaveDto dto) {
        gistPostService.save(dto);
    }

    @PostMapping("/image")
    public void saveImagePost(ImagePostSaveDto dto) {
        imagePostService.save(dto);
    }

    @GetMapping("/count")
    public List<PostCountDto> fetchPostCount(@RequestParam(required = true) Long userId) {
        return postService.countByDate(userId);
    }
}
