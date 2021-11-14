package com.wysiwyg.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class PostSearchCondition {

    private Long userId;
    private String regDate;
    private String type;
}
