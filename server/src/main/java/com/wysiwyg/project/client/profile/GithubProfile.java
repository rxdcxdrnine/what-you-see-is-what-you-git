package com.wysiwyg.project.client.profile;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class GithubProfile {
    private String login;
    private long id;
    private String nodeId;
    private String avatarUrl;
    private String gravatarId;
    private String url;
    private String htmlUrl;
    private String followersUrl;
    private String followingUrl;
    private String gistsUrl;
    private String starredUrl;
    private String subscriptionsUrl;
    private String organizationsUrl;
    private String reposUrl;
    private String eventsUrl;
    private String receivedEventsUrl;
    private String type;
    private boolean siteAdmin;
    private String name;
    private String company;
    private String blog;
    private String location;
    private Object email;
    private Object hireable;
    private String bio;
    private Object twitterUsername;
    private long publicRepos;
    private long publicGists;
    private long followers;
    private long following;
    private String createdAt;
    private String updatedAt;
}
