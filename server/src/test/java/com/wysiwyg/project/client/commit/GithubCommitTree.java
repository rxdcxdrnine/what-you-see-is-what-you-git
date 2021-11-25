package com.wysiwyg.project.client.commit;

import lombok.Data;

@Data
public class GithubCommitTree {
    private String sha;
    private String url;
}