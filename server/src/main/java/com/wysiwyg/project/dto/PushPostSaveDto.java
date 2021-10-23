package com.wysiwyg.project.dto;

import com.wysiwyg.project.entity.Push;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class PushPostSaveDto {
    private Long pushId;
    private String repoName;
    private String branchName;
    private List<String> commitUrls;
    private LocalDateTime uploadDate;
    private String markdown;

    public Push toEntity() {
        return Push.builder()
                .pushId(pushId)
                .repoName(repoName)
                .branchName(branchName)
                .uploadDate(uploadDate)
                .markdown(markdown)
                .build();
    }
}
