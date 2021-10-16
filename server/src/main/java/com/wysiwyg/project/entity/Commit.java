package com.wysiwyg.project.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
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
    private Long additions;

    @Column(nullable = false)
    private Long deletions;

    @Column(nullable = false)
    private LocalDateTime uploadDate;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Push push;

    @OneToMany(mappedBy = "commit")
    private List<CommitFile> commitFiles = new ArrayList<>();

    @Builder()
    public Commit(String commitSha, Long additions, Long deletions, LocalDateTime uploadDate, Push push) {
        this.commitSha = commitSha;
        this.additions = additions;
        this.deletions = deletions;
        this.uploadDate = uploadDate;
        this.push = push;
    }
}
