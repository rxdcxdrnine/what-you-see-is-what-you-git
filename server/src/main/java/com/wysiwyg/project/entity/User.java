package com.wysiwyg.project.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@ToString
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, unique = true)
    private Long githubId;

    @Column(length = 39, nullable = false)
    private String userName;

    @Column(nullable = false)
    private String profileName;

    @Column(nullable = false)
    private String avatarUrl;

    @Column(nullable = false)
    private Integer followingNum = 0;

    @Column(nullable = false)
    private Integer followerNum = 0;

    @OneToMany(mappedBy = "following")
    List<Follow> followings = new ArrayList<>();

    @OneToMany(mappedBy = "follower")
    List<Follow> followers = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    List<Post> posts = new ArrayList<>();

    @Builder
    public User(Long githubId, String userName, String profileName, String avatarUrl) {
        this.githubId = githubId;
        this.userName = userName;
        this.profileName = profileName;
        this.avatarUrl = avatarUrl;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setProfileName(String profileName) {
        this.profileName = profileName;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public void addFollowing(Follow follow) {
        this.followings.add(follow);
        this.followingNum += 1;
    }

    public void addFollower(Follow follow) {
        this.followers.add(follow);
        this.followerNum += 1;
    }

    public void deleteFollowing(Follow follow) {
        this.followings.remove(follow);
        this.followingNum -= 1;
    }

    public void deleteFollower(Follow follow) {
        this.followers.remove(follow);
        this.followerNum -= 1;
    }
}
