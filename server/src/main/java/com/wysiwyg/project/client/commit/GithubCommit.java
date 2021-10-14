package com.wysiwyg.project.client.commit;

import lombok.Data;

@Data
public class GithubCommit {
    private String sha;
    private String nodeId;
    private GithubCommitMeta commit;
    private String url;
    private String htmlUrl;
    private String commentsUrl;
    private GithubCommitAuthor author;
    private GithubCommitAuthor committer;
    private GithubCommitParent[] parents;
    private GithubCommitStats stats;
    private GithubCommitFile[] files;
}

