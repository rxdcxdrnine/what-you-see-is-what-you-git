package com.wysiwyg.project.dto;

import com.wysiwyg.project.entity.CommitFile;
import lombok.Data;

@Data
public class CommitFileFetchDto {

    private Long commitFileId;
    private String fileSha;
    private String fileName;
    private String fileStatus;
    private Long additions;
    private Long deletions;
    private String commitFileUrl;

    public CommitFileFetchDto(CommitFile commitFile) {
        this.commitFileId = commitFile.getCommitFileId();
        this.fileSha = commitFile.getFileSha();
        this.fileName = commitFile.getFileName();
        this.fileStatus = commitFile.getFileStatus();
        this.additions = commitFile.getAdditions();
        this.deletions = commitFile.getDeletions();
        this.commitFileUrl = commitFile.getCommitFileUrl();
    }
}
