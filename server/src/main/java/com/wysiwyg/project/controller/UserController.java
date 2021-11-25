package com.wysiwyg.project.controller;

import com.wysiwyg.project.dto.UserFetchDto;
import com.wysiwyg.project.dto.UserSearchCondition;
import com.wysiwyg.project.entity.User;
import com.wysiwyg.project.repository.UserRepository;
import com.wysiwyg.project.security.CurrentUser;
import com.wysiwyg.project.security.UserPrincipal;
import com.wysiwyg.project.security.exception.ResourceNotFoundException;
import com.wysiwyg.project.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    @GetMapping
    public UserFetchDto fetchUserByGithubId(
            @RequestParam(value = "userId", required = false) Long userId) {

        UserSearchCondition condition = new UserSearchCondition();
        condition.setUserId(userId);

        return userService.searchByIdWithPostCounts(condition);
    }

    @GetMapping("/auth")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }
}
