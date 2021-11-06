package com.wysiwyg.project.dto;

import com.wysiwyg.project.entity.Follow;
import com.wysiwyg.project.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FollowSaveDto {

    private Long followingId;
    private Long followerId;

    public Follow toEntity(User following, User follower) {
        return Follow.builder()
                .following(following)
                .follower(follower)
                .build();
    }
}
