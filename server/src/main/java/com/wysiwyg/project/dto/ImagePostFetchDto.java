package com.wysiwyg.project.dto;

import com.wysiwyg.project.entity.Image;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ImagePostFetchDto {
    private Long postId;
    private String markdown;

    private String imageFilename;
    private LocalDateTime regDate;

    public ImagePostFetchDto(Image image) {
        this.postId = image.getPostId();
        this.markdown = image.getMarkdown();

        this.imageFilename = image.getImageFilename();
        this.regDate = image.getRegDate();
    }
}
