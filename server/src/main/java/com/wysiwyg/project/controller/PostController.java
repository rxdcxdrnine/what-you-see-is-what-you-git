package com.wysiwyg.project.controller;

import com.wysiwyg.project.dto.*;
import com.wysiwyg.project.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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

    @GetMapping()
    public Page<PostFetchDto> fetchAllPosts(
            @RequestParam Long userId,
            @RequestParam(required = false) String regDate,
            @RequestParam(required = false) String type,
            @PageableDefault(size = 3) Pageable pageable
    ) {
        PostSearchCondition condition = new PostSearchCondition();
        condition.setUserId(userId);
        condition.setRegDate(regDate);
        condition.setType(type);

        return postService.searchByUserId(condition, pageable);
    }

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

    @GetMapping("/commit")
    public List<CommitFetchDto> fetchCommits(@RequestParam(required = true) Long postId) {
        return commitService.findByPostId(postId);
    }

    @PostMapping("/push")
    public void savePushPost(@RequestBody PushPostSaveDto dto, @RequestHeader String OAuthToken) {
        pushPostService.save(dto, OAuthToken);
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
        UserSearchCondition condition = new UserSearchCondition();
        condition.setUserId(userId);

        return postService.countByDate(condition);
    }
}
