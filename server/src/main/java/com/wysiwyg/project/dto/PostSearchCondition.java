package com.wysiwyg.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PostSearchCondition {

    private Long userId;
    private String regDate;
    private String type;
}
