package com.wysiwyg.project.client.push;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class GithubPushEvent {
    private String id;
    private String type;
    private GithubPushActor actor;
    private GithubPushRepo repo;
    private GithubPushPayload payload;
    private boolean githubEventPublic;
    private LocalDateTime createdAt;
    private GithubPushActor org;
}