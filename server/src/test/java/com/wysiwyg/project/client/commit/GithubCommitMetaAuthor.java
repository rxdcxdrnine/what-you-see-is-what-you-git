package com.wysiwyg.project.client.commit;

import lombok.Data;

@Data
public class GithubCommitMetaAuthor {
    private String name;
    private String email;
    private String date;
}
