package com.wysiwyg.project.client;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.wysiwyg.project.client.commit.GithubCommit;
import com.wysiwyg.project.client.profile.GithubProfile;
import com.wysiwyg.project.client.push.GithubPushCommit;
import com.wysiwyg.project.client.push.GithubPushEvent;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.codec.json.Jackson2JsonDecoder;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@SpringBootTest
public class GithubClientTest {

    @Test
    public void getGithubProfile() {

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE);

        ExchangeStrategies exchangeStrategies = ExchangeStrategies.builder()
                .codecs(configurer ->
                        configurer.defaultCodecs().jackson2JsonDecoder(new Jackson2JsonDecoder(objectMapper)))
                .build();

        WebClient webClient = WebClient.builder()
                .baseUrl("https://api.github.com/users/")
                .exchangeStrategies(exchangeStrategies)
                .build();

        Mono<GithubProfile> githubProfileMono = webClient.get()
                .uri("/rxdcxdrnine")
                .retrieve()
                .bodyToMono(GithubProfile.class);

        GithubProfile githubProfile = githubProfileMono.block();
        System.out.println(githubProfile);
    }

    @Test
    public void getGithubPushes() {

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE);
        objectMapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);

        ExchangeStrategies exchangeStrategies = ExchangeStrategies.builder()
                .codecs(configurer -> {
                    configurer.defaultCodecs().jackson2JsonDecoder(new Jackson2JsonDecoder(objectMapper));
                    configurer.defaultCodecs().maxInMemorySize(-1);
                })
                .build();

        WebClient webClient = WebClient.builder()
                .baseUrl("https://api.github.com/users/")
                .exchangeStrategies(exchangeStrategies)
                .build();

        Mono<GithubPushEvent[]> githubEventsMono = webClient.get()
                .uri("rxdcxdrnine/events")
                .retrieve()
                .bodyToMono(GithubPushEvent[].class);

        GithubPushEvent[] githubEventsArray = githubEventsMono.block();
        List<GithubPushEvent> githubEvents = Arrays.stream(githubEventsArray)
                .filter(event -> event.getType().equals("PushEvent"))
                .collect(Collectors.toList());

        for(GithubPushEvent githubEvent : githubEvents) {
            List<GithubPushCommit> githubCommits = Arrays.stream(githubEvent.getPayload().getCommits())
                    .collect(Collectors.toList());

            for(GithubPushCommit githubCommit : githubCommits) {
                getGithubCommit(githubCommit.getUrl());
            }
        }
    }

    @Test
    public void getGithubCommit(String githubCommitUrl) {

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE);

        ExchangeStrategies exchangeStrategies = ExchangeStrategies.builder()
                .codecs(configurer -> {
                    configurer.defaultCodecs().jackson2JsonDecoder(new Jackson2JsonDecoder(objectMapper));
                })
                .build();

        WebClient webClient = WebClient.builder()
                .exchangeStrategies(exchangeStrategies)
                .build();

        Mono<GithubCommit> githubCommitMono = webClient.get()
                .uri(githubCommitUrl)
                .retrieve()
                .bodyToMono(GithubCommit.class);

        GithubCommit githubCommit = githubCommitMono.block();
        System.out.println(githubCommit.getHtmlUrl());
    }
}
