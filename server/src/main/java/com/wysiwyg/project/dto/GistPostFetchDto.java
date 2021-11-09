package com.wysiwyg.project.dto;

import com.wysiwyg.project.entity.Gist;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class GistPostFetchDto {
    private Long postId;
    private LocalDateTime uploadDate;
    private String markdown;

    private String gistId;
    private String gistDescription;
    private LocalDateTime regDate;

    public GistPostFetchDto(Gist gist) {
        this.postId = gist.getPostId();
        this.uploadDate = gist.getUploadDate();
        this.markdown = gist.getMarkdown();

        this.gistId = gist.getGistId();
        this.gistDescription = gist.getGistDescription();
        this.regDate = gist.getRegDate();
    }
}
