package com.wysiwyg.project.controller;

import com.wysiwyg.project.dto.FollowFetchDto;
import com.wysiwyg.project.dto.FollowSaveDto;
import com.wysiwyg.project.dto.UserFetchDto;
import com.wysiwyg.project.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/follow")
@RequiredArgsConstructor
public class FollowController {

    private final FollowService followService;

    @PostMapping
    public void save(@RequestBody FollowSaveDto dto) {
        followService.save(dto);
    }

    @GetMapping("/following/{userId}")
    public List<FollowFetchDto> findFollowing(@PathVariable(value = "userId") Long userId) {
        return followService.findFollowingByUserId(userId);
    }

    @GetMapping("/follower/{userId}")
    public List<FollowFetchDto> findFollower(@PathVariable(value = "userId") Long userId) {
        return followService.findFollowerByUserId(userId);
    }

    @GetMapping("/search")
    public List<UserFetchDto> findUser(@RequestParam(value = "username") String userName) {
        return followService.findUserByUserName(userName);
    }

    @DeleteMapping("/{followId}")
    public void delete(@PathVariable(value = "followId") Long followId) {
        followService.delete(followId);
    }
}
