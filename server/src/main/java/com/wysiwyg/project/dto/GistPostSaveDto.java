package com.wysiwyg.project.dto;

import com.wysiwyg.project.entity.Gist;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class GistPostSaveDto {
    private String gistId;
    private String gistDescription;
    private List<String> gistFilenames;
    private LocalDateTime uploadDate;
    private String markdown;

    public Gist toEntity() {
        return Gist.builder()
                .gistId(gistId)
                .gistDescription(gistDescription)
                .uploadDate(uploadDate)
                .markdown(markdown)
                .build();
    }
}
