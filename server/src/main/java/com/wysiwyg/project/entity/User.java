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

    private Long githubId;

    @Column(length = 39, nullable = false)
    private String userName;

    @Column(nullable = false)
    private String profileName;

    @Column(nullable = false)
    private String avatarUrl;

    @Column(nullable = false)
    private Integer dayNum = 0;

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
    public User(String userName, String profileName, String avatarUrl) {
        this.userName = userName;
        this.profileName = profileName;
        this.avatarUrl = avatarUrl;
    }
}
