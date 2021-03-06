package com.wysiwyg.project.security.oauth2;

import java.util.Map;

public abstract class OAuth2UserInfo {
    protected Map<String, Object> attributes;

    public OAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public Map<String, Object> getAttributes() {
        return attributes;
    }

    public abstract Long getId();

    public abstract String getUserName();

    public abstract String getProfileName();

    public abstract String getImageUrl();
}
