package com.wysiwyg.project.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@ToString
public class Commit extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commitId;

    @Column(nullable = false)
    private String commitSha;

    @Column(nullable = false)
    private Integer additions;

    @Column(nullable = false)
    private Integer deletions;

    @Column(nullable = false)
    private LocalDateTime uploadedDate;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    @OneToMany(mappedBy = "commit")
    private List<File> files = new ArrayList<>();
}
