package com.wysiwyg.project.controller;

import com.wysiwyg.project.dto.UserFetchDto;
import com.wysiwyg.project.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @GetMapping
    public UserFetchDto fetchUser(@RequestParam(value = "githubId") Long githubId) {
        return userService.searchByGithubId(githubId);
    }
}
