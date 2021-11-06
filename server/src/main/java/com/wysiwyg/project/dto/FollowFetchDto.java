package com.wysiwyg.project.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class FollowFetchDto {

    private Long followId;
    private Long userId;
    private String userName;
    private String profileName;
    private String avatarUrl;

    @QueryProjection
    public FollowFetchDto(Long followId, Long userId, String userName, String profileName, String avatarUrl) {
        this.followId = followId;
        this.userId = userId;
        this.userName = userName;
        this.profileName = profileName;
        this.avatarUrl = avatarUrl;
    }
}
