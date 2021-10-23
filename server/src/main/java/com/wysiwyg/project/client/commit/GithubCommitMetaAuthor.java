package com.wysiwyg.project.client.commit;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class GithubCommitMetaAuthor {
    private String name;
    private String email;
    private LocalDateTime date;
}
