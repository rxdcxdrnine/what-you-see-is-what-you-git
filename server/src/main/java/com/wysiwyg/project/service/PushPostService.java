package com.wysiwyg.project.service;

import com.wysiwyg.project.client.GithubClient;
import com.wysiwyg.project.client.commit.GithubCommit;
import com.wysiwyg.project.client.commit.GithubCommitFile;
import com.wysiwyg.project.dto.PushPostFetchDto;
import com.wysiwyg.project.dto.PushPostSaveDto;
import com.wysiwyg.project.entity.Commit;
import com.wysiwyg.project.entity.CommitFile;
import com.wysiwyg.project.entity.Push;
import com.wysiwyg.project.entity.User;
import com.wysiwyg.project.repository.CommitFileRepository;
import com.wysiwyg.project.repository.CommitRepository;
import com.wysiwyg.project.repository.PushPostRepository;
import com.wysiwyg.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PushPostService {

    private final PushPostRepository pushPostRepository;
    private final CommitRepository commitRepository;
    private final CommitFileRepository commitFileRepository;
    private final UserRepository userRepository;
    private final GithubClient githubClient;

    @Transactional
    public void save(PushPostSaveDto dto) {
        // find user
        Optional<User> user = userRepository.findById(dto.getUserId());

        // save push post
        Push push = dto.toEntity(user.get());
        pushPostRepository.save(push);

        List<String> commitUrls = dto.getCommitUrls();

        // save commit
        for(String commitUrl : commitUrls) {
            GithubCommit githubCommit = githubClient.getGithubCommit(commitUrl);
            Commit commit = githubCommit.toEntity(push);
            commitRepository.save(commit);

            // save commitFile
            List<GithubCommitFile> githubCommitFiles = List.of(githubCommit.getFiles());
            for (GithubCommitFile githubCommitFile: githubCommitFiles) {
                CommitFile commitFile = githubCommitFile.toEntity(commit);
                commitFileRepository.save(commitFile);
            }
        }
    }
}
