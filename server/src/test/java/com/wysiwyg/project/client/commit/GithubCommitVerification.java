package com.wysiwyg.project.client.commit;

import lombok.Data;

@Data
public class GithubCommitVerification {
    private boolean verified;
    private String reason;
    private Object signature;
    private Object payload;
}
