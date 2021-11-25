package com.wysiwyg.project.dto;

import com.wysiwyg.project.entity.Gist;
import com.wysiwyg.project.entity.User;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class GistPostSaveDto {
    private Long userId;
    private String gistId;
    private String gistDescription;
    private List<String> gistFilenames;
    private LocalDateTime uploadDate;
    private String markdown;

    public Gist toEntity(User user) {
        return Gist.builder()
                .user(user)
                .gistId(gistId)
                .gistDescription(gistDescription)
                .uploadDate(uploadDate)
                .markdown(markdown)
                .build();
    }
}
