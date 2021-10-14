package com.wysiwyg.project.client.push;

import lombok.Data;

@Data
public class GithubPushCommit {
    private String sha;
    private GithubPushAuthor author;
    private String message;
    private boolean distinct;
    private String url;
}
