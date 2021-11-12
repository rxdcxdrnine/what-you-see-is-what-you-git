package com.wysiwyg.project.client;

import com.wysiwyg.project.client.commit.GithubCommit;
import com.wysiwyg.project.client.gist.GithubGist;
import com.wysiwyg.project.client.profile.GithubProfile;
import com.wysiwyg.project.client.push.GithubPushEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class GithubClient {

    private final WebClient webClient;

    public GithubProfile getGithubProfile() {

        Mono<GithubProfile> githubProfileMono = webClient.get()
                .uri("https://api.github.com/users/rxdcxdrnine")
                .retrieve()
                .bodyToMono(GithubProfile.class);

        GithubProfile githubProfile = githubProfileMono.block();
        return githubProfile;
    }

    public List<GithubPushEvent> getGithubPushes(String username) {

        Mono<GithubPushEvent[]> githubEventsMono = webClient.get()
                .uri("https://api.github.com/users/" + username + "/events")
                .retrieve()
                .bodyToMono(GithubPushEvent[].class);

        GithubPushEvent[] githubEvents = githubEventsMono.block();
        List<GithubPushEvent> githubPushes = Arrays.stream(githubEvents)
                .filter(event -> event.getType().equals("PushEvent"))
                .collect(Collectors.toList());

        System.out.println(githubPushes);

        return githubPushes;
    }

    public GithubCommit getGithubCommit(String githubCommitUrl) {

        Mono<GithubCommit> githubCommitMono = webClient.get()
                .uri(githubCommitUrl)
                .retrieve()
                .bodyToMono(GithubCommit.class);

        GithubCommit githubCommit = githubCommitMono.block();
        return githubCommit;
    }

    public List<GithubGist> getGithubGists(String username) {

        Mono<GithubGist[]> githubGistsMono = webClient.get()
                .uri("https://api.github.com/users/" + username + "/gists")
                .retrieve()
                .bodyToMono(GithubGist[].class);

        GithubGist[] githubGists = githubGistsMono.block();
        return Arrays.stream(githubGists).collect(Collectors.toList());
     }
}
