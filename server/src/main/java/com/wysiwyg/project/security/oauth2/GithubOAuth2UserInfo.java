package com.wysiwyg.project.security.oauth2;

import java.util.Map;

public class GithubOAuth2UserInfo extends OAuth2UserInfo {

    public GithubOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public Long getId() {
        return Long.valueOf((Integer) attributes.get("id"));
    }

    @Override
    public String getUserName() {
        return (String) attributes.get("login");
    }

    @Override
    public String getProfileName() {
        return (String) attributes.get("name");
    }

    @Override
    public String getImageUrl() {
        return (String) attributes.get("avatar_url");
    }
}
