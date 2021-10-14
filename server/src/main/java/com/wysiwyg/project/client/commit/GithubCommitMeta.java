package com.wysiwyg.project.client.commit;

import lombok.Data;

@Data
public class GithubCommitMeta {
    private GithubCommitMetaAuthor author;
    private GithubCommitMetaAuthor committer;
    private String message;
    private GithubCommitTree tree;
    private String url;
    private long commentCount;
    private GithubCommitVerification verification;
}
