package com.wysiwyg.project.dto;

import com.querydsl.core.annotations.QueryProjection;
import com.wysiwyg.project.entity.Push;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PushPostFetchDto {
    private Long postId;
    private LocalDateTime uploadDate;
    private String markdown;

    private Long pushId;
    private String repoName;
    private String branchName;
    private LocalDateTime regDate;

    public PushPostFetchDto(Push push) {
        this.postId = push.getPostId();
        this.uploadDate = push.getUploadDate();
        this.markdown = push.getMarkdown();

        this.pushId = push.getPushId();
        this.repoName = push.getRepoName();
        this.branchName = push.getBranchName();
        this.regDate = push.getRegDate();
    }
}
