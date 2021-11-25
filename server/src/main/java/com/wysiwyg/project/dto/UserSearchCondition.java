package com.wysiwyg.project.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserSearchCondition {

    private Long userId;
    private String userName;
}
