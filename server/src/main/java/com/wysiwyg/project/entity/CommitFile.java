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

    @Column(nullable = false, name = "commit_file_sha")
    private String fileSha;

    @Column(nullable = false, name = "commit_file_name")
    private String fileName;

    @Column(nullable = false, name = "commit_file_status")
    private String fileStatus;

    @Column(nullable = false)
    private Long additions;

    @Column(nullable = false)
    private Long deletions;

    @Column(nullable = false)
    private String commitFileUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "commit_id")
    private Commit commit;

    @Builder
    public CommitFile(String fileSha, String fileName, String fileStatus, Long additions, Long deletions, Commit commit, String commitFileUrl) {
        this.fileSha = fileSha;
        this.fileName = fileName;
        this.fileStatus = fileStatus;
        this.additions = additions;
        this.deletions = deletions;
        this.commit = commit;
        this.commitFileUrl = commitFileUrl;
    }

}
