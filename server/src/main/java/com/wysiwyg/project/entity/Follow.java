package com.wysiwyg.project.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@ToString
public class Follow extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long followId;

    @ManyToOne
    @JoinColumn(name = "following_id")
    private User following;

    @ManyToOne
    @JoinColumn(name = "follower_id")
    private User follower;

    @Builder
    public Follow(User following, User follower) {
        this.following = following;
        this.follower = follower;
    }
}
