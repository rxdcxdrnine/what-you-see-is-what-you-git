package com.wysiwyg.project.dto;

import com.wysiwyg.project.entity.Commit;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class CommitFetchDto {

    private Long commitId;
    private String commitSha;
    private Long additions;
    private Long deletions;
    private LocalDateTime uploadDate;
    private List<CommitFileFetchDto> commitFiles;

    public CommitFetchDto(Commit commit) {
        this.commitId = commit.getCommitId();
        this.commitSha = commit.getCommitSha();
        this.additions = commit.getAdditions();
        this.deletions = commit.getDeletions();
        this.uploadDate = commit.getUploadDate();
        this.commitFiles = commit.getCommitFiles().stream()
                .map(CommitFileFetchDto::new)
                .collect(Collectors.toList());
    }
}
