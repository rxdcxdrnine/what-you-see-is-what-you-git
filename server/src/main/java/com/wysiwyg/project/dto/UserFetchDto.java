package com.wysiwyg.project.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;

@Data
public class UserFetchDto {

    private Long userId;
    private String userName;
    private String profileName;
    private String avatarUrl;

    @QueryProjection
    public UserFetchDto(Long userId, String userName, String profileName, String avatarUrl) {
        this.userId = userId;
        this.userName = userName;
        this.profileName = profileName;
        this.avatarUrl = avatarUrl;
    }
}
