package com.wysiwyg.project.dto;

import com.wysiwyg.project.entity.Image;
import com.wysiwyg.project.entity.User;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ImagePostSaveDto {
    private Long userId;
    private MultipartFile image;
    private String markdown;

    public Image toEntity(String filename, User user) {
        return Image.builder()
                .user(user)
                .imageFilename(filename)
                .markdown(markdown)
                .build();
    }
}
