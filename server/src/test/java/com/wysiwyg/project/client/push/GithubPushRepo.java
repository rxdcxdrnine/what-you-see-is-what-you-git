package com.wysiwyg.project.client.push;

import lombok.Data;

@Data
public class GithubPushRepo {
    private long id;
    private String name;
    private String url;
}