package com.wysiwyg.project.client.commit;

import lombok.Data;

@Data
public class GithubCommitStats {
    private long total;
    private long additions;
    private long deletions;
}
