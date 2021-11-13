package com.wysiwyg.project.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;

import java.util.List;

@Data
public class UserFetchDto {

    private Long userId;
    private Long githubId;
    private String userName;
    private String profileName;
    private String avatarUrl;
    private Integer dayNum;
    private Integer followingNum;
    private Integer followerNum;

    private List<PostCountDto> counts;

    @QueryProjection
    public UserFetchDto(Long userId, String userName, String profileName, String avatarUrl) {
        this.userId = userId;
        this.userName = userName;
        this.profileName = profileName;
        this.avatarUrl = avatarUrl;
    }

    @QueryProjection
    public UserFetchDto(Long userId, Long githubId, String userName, String profileName, String avatarUrl, Integer followingNum, Integer followerNum) {
        this.userId = userId;
        this.githubId = githubId;
        this.userName = userName;
        this.profileName = profileName;
        this.avatarUrl = avatarUrl;
        this.followingNum = followingNum;
        this.followerNum = followerNum;
    }
}
