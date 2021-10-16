package com.wysiwyg.project.dto;

import com.wysiwyg.project.entity.Image;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ImagePostSaveDto {
    private MultipartFile image;
    private String markdown;

    public Image toEntity() {
        return Image.builder()
                .imageFilename(image.getOriginalFilename())
                .markdown(markdown)
                .build();
    }
}
