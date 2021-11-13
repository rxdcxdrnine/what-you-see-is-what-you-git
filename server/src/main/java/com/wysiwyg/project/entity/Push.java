package com.wysiwyg.project.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DiscriminatorValue("PUSH")
@Getter
@ToString
public class Push extends Post {

    private Long pushId;

    private String repoName;

    private String branchName;

    @OneToMany(mappedBy = "push", cascade = CascadeType.ALL)
    private List<Commit> commits = new ArrayList<>();

    @Builder
    public Push(Long pushId, String repoName, String branchName, LocalDateTime uploadDate, String markdown, User user) {
        super(uploadDate, markdown, user);
        this.pushId = pushId;
        this.repoName = repoName;
        this.branchName = branchName;
    }
}
