package com.wysiwyg.project.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@ToString
public class CommitFile extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commitFileId;

    @Column(nullable = false)
    private String fileSha;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private String fileStatus;

    @Column(nullable = false)
    private Long additions;

    @Column(nullable = false)
    private Long deletions;

    @ManyToOne
    @JoinColumn(name = "commit_id")
    private Commit commit;

    @Builder
    public CommitFile(String fileSha, String fileName, String fileStatus, Long additions, Long deletions, Commit commit) {
        this.fileSha = fileSha;
        this.fileName = fileName;
        this.fileStatus = fileStatus;
        this.additions = additions;
        this.deletions = deletions;
        this.commit = commit;
    }

}
