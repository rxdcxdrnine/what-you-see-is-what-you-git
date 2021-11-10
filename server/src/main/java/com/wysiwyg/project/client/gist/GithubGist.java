package com.wysiwyg.project.client.gist;

import lombok.Data;

import java.time.LocalDateTime;


@Data
public class GithubGist {
    private String url;
    private String forksUrl;
    private String commitsUrl;
    private String id;
    private String nodeId;
    private String gitPullUrl;
    private String gitPushUrl;
    private String htmlUrl;
    private boolean githubGistPublic;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String description;
    private long comments;
    private String commentsUrl;
    private GithubGistOwner owner;
    private boolean truncated;
}
