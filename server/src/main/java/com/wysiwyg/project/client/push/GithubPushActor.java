package com.wysiwyg.project.client.push;

import lombok.Data;

@Data
public class GithubPushActor {
    private long id;
    private String login;
    private String displayLogin;
    private String gravatarId;
    private String url;
    private String avatarUrl;
}
