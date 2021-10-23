package com.wysiwyg.project.client.commit;

import com.wysiwyg.project.entity.Commit;
import com.wysiwyg.project.entity.CommitFile;
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

    public CommitFile toEntity(Commit commit) {
        return CommitFile.builder()
                .fileSha(sha)
                .fileName(filename)
                .fileStatus(status)
                .additions(additions)
                .deletions(deletions)
                .commit(commit)
                .build();
    }
}
