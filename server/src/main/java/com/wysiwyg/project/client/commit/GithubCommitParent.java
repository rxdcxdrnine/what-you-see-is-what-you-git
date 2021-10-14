package com.wysiwyg.project.client.commit;

import lombok.Data;

@Data
public class GithubCommitParent {
    private String sha;
    private String url;
    private String htmlUrl;
}