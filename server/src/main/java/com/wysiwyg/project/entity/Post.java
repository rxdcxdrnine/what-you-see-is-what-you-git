package com.wysiwyg.project.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@ToString
public abstract class Post extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    private LocalDateTime uploadDate;

    private String markdown;

    @Column(name = "type", insertable = false, updatable = false)
    private String type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public Post(LocalDateTime uploadDate, String markdown, User user) {
        this.uploadDate = uploadDate;
        this.markdown = markdown;
        this.user = user;
    }

    public void setMarkdown(String markdown) {
        this.markdown = markdown;
    }
}
