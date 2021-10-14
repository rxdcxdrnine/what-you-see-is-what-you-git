package com.wysiwyg.project.client.commit;

import lombok.Data;

@Data
public class GithubCommitFile {
    private String sha;
    private String filename;
    private String status;
    private long additions;
    private long deletions;
    private long changes;
    private String blobUrl;
    private String rawUrl;
    private String contentsUrl;
    private String patch;
}
