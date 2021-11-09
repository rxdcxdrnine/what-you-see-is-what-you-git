package com.wysiwyg.project;

import com.wysiwyg.project.client.GithubClient;
import com.wysiwyg.project.client.gist.GithubGist;
import com.wysiwyg.project.client.push.GithubPushEvent;
import com.wysiwyg.project.entity.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;

@Component
@RequiredArgsConstructor
public class InitDb {

    private final InitService initService;

    @PostConstruct
    public void init() {
        initService.dbInit();
    }

    @Component
    @Transactional
    @RequiredArgsConstructor
    static class InitService {

        private final GithubClient githubClient;
        private final EntityManager em;

        public void dbInit() {
            User userA = createUser("rxdcxdrnine", "Kang Changgu", "https://avatars.githubusercontent.com/u/50660684?v=4");
            User userB = createUser("handal95", "SangilHan", "https://avatars.githubusercontent.com/u/45425838?v=4");
            User userC = createUser("beeetea", "Lee Ho Jun", "https://avatars.githubusercontent.com/u/32982728?v=4");
            User userD = createUser("gyuZzang", "GyuZzang", "https://avatars.githubusercontent.com/u/43772472?v=4");

            em.persist(userA);
            em.persist(userB);
            em.persist(userC);
            em.persist(userD);

            Push push = createPush(userA.getUserId(), userA.getUserName());
            Gist gist = createGist(userA.getUserId(), userA.getUserName());
            Image image = createImage(userA.getUserId());

            em.persist(push);
            em.persist(gist);
            em.persist(image);
        }

        private User createUser(String userName, String profileName, String avatarUrl) {
            return User.builder()
                    .userName(userName)
                    .profileName(profileName)
                    .avatarUrl(avatarUrl)
                    .build();
        }

        private Push createPush(Long userId, String username) {
            List<GithubPushEvent> githubPushEvents = githubClient.getGithubPushes(username);
            GithubPushEvent pushEvent = githubPushEvents.get(0);

            return Push.builder()
                    .pushId(pushEvent.getPayload().getPushId())
                    .repoName(pushEvent.getRepo().getName())
                    .branchName(pushEvent.getPayload().getRef())
                    .uploadDate(pushEvent.getCreatedAt())
                    .markdown("# sample")
                    .userId(userId)
                    .build();
        }

        private Gist createGist(Long userId, String username) {
            List<GithubGist> githubGists = githubClient.getGithubGists(username);
            GithubGist githubGist = githubGists.get(0);

            return Gist.builder()
                    .gistId(githubGist.getId())
                    .gistDescription(githubGist.getDescription())
                    .uploadDate(githubGist.getCreatedAt())
                    .markdown("# sample")
                    .userId(userId)
                    .build();
        }

        private Image createImage(Long userId) {
            return Image.builder()
                    .imageFilename("sample_image.jpg")
                    .markdown("# sample")
                    .userId(userId)
                    .build();
        }
    }
}
