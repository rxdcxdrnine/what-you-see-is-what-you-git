package com.wysiwyg.project.client.push;

import lombok.Data;

@Data
public class GithubPushEvent {
    private String id;
    private String type;
    private GithubPushActor actor;
    private GithubPushRepo repo;
    private GithubPushPayload payload;
    private boolean githubEventPublic;
    private String createdAt;
    private GithubPushActor org;
}