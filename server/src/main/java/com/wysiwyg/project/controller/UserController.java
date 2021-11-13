package com.wysiwyg.project.controller;

import com.wysiwyg.project.dto.UserFetchDto;
import com.wysiwyg.project.dto.UserSearchCondition;
import com.wysiwyg.project.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @GetMapping
    public UserFetchDto fetchUserByGithubId(
            @RequestParam(value = "userId", required = false) Long userId,
            @RequestParam(value = "githubId", required = false) Long githubId) {

        UserSearchCondition condition = new UserSearchCondition();
        condition.setUserId(userId);
        condition.setGithubId(githubId);

        return userService.searchByIdWithPostCounts(condition);
    }
}
