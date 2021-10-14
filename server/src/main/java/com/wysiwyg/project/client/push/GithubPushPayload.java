package com.wysiwyg.project.client.push;

import lombok.Data;

@Data
public class GithubPushPayload {
    private long pushId;
    private long size;
    private long distinctSize;
    private String ref;
    private String head;
    private String before;
    private GithubPushCommit[] commits;
}