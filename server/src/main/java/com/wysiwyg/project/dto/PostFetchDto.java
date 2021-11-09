package com.wysiwyg.project.dto;

import com.querydsl.core.annotations.QueryProjection;
import com.wysiwyg.project.entity.Gist;
import com.wysiwyg.project.entity.Image;
import com.wysiwyg.project.entity.Post;
import com.wysiwyg.project.entity.Push;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PostFetchDto {

    // base entity
    private LocalDateTime regDate;
    private LocalDateTime modDate;

    // post
    private Long postId;
    private LocalDateTime uploadDate;
    private String markdown;
    private String type;

    // push
    private Long pushId;
    private String repoName;
    private String branchName;

    // gist
    private String gistId;
    private String gistDescription;

    // image
    private String imageFilename;

    @QueryProjection
    public PostFetchDto(Post post) {
        this.postId = post.getPostId();
        this.uploadDate = post.getUploadDate();
        this.markdown = post.getMarkdown();
        this.type = post.getType();

        this.regDate = post.getRegDate();
        this.modDate = post.getModDate();

        if (post instanceof Push) {
            this.pushId = ((Push) post).getPushId();
            this.repoName = ((Push) post).getRepoName();
            this.branchName = ((Push) post).getBranchName();
        }
        if (post instanceof Gist) {
            this.gistId = ((Gist) post).getGistId();
            this.gistDescription = ((Gist) post).getGistDescription();
        }
        if (post instanceof Image){
            this.imageFilename = ((Image) post).getImageFilename();
        }
    }
}
