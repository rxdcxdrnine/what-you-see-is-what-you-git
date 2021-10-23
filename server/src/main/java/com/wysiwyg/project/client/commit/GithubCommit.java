package com.wysiwyg.project.client.commit;

import com.wysiwyg.project.entity.Commit;
import com.wysiwyg.project.entity.Push;
import lombok.Data;

@Data
public class GithubCommit {
    private String sha;
    private String nodeId;
    private GithubCommitMeta commit;
    private String url;
    private String htmlUrl;
    private String commentsUrl;
    private GithubCommitAuthor author;
    private GithubCommitAuthor committer;
    private GithubCommitParent[] parents;
    private GithubCommitStats stats;
    private GithubCommitFile[] files;

    public Commit toEntity(Push push) {
        return Commit.builder()
                .commitSha(sha)
                .additions(stats.getAdditions())
                .deletions(stats.getDeletions())
                .uploadDate(commit.getCommitter().getDate())
                .push(push)
                .build();
    }
}

