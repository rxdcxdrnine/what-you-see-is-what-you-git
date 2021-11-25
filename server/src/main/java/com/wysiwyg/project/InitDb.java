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
            // user
            // User userA = createUser(50660684L, "rxdcxdrnine", "Kang Changgu", "https://avatars.githubusercontent.com/u/50660684?v=4");
            User userB = createUser(45425838L, "handal95", "SangilHan", "https://avatars.githubusercontent.com/u/45425838?v=4");
            User userC = createUser(32982728L, "beeetea", "Lee Ho Jun", "https://avatars.githubusercontent.com/u/32982728?v=4");
            User userD = createUser(43772472L, "gyuZzang", "GyuZzang", "https://avatars.githubusercontent.com/u/43772472?v=4");

            // em.persist(userA);
            em.persist(userB);
            em.persist(userC);
            em.persist(userD);

            // post (userB)
            Push push_userB = createPush(userB);
            Gist gist_userB = createGist(userB);
            Image image_userB = createImage(userB, "sample_image.jpg");

            if(push_userB != null) em.persist(push_userB);
            if(gist_userB != null) em.persist(gist_userB);
            if(image_userB != null) em.persist(image_userB);

            // post (userB)
            Push push_userC = createPush(userB);
            Gist gist_userC = createGist(userB);
            Image image_userC = createImage(userB, "sample_image2.jpg");

            if(push_userC != null) em.persist(push_userC);
            if(gist_userC != null) em.persist(gist_userC);
            if(image_userC != null) em.persist(image_userC);
        }

        private User createUser(Long githubId, String userName, String profileName, String avatarUrl) {
            return User.builder()
                    .githubId(githubId)
                    .userName(userName)
                    .profileName(profileName)
                    .avatarUrl(avatarUrl)
                    .build();
        }

        private Push createPush(User user) {
            List<GithubPushEvent> githubPushEvents = githubClient.getGithubPushes(user.getUserName());
            if (githubPushEvents.size() > 0) {
                GithubPushEvent pushEvent = githubPushEvents.get(0);

                return Push.builder()
                        .pushId(pushEvent.getPayload().getPushId())
                        .repoName(pushEvent.getRepo().getName())
                        .branchName(pushEvent.getPayload().getRef())
                        .uploadDate(pushEvent.getCreatedAt())
                        .markdown("# sample")
                        .user(user)
                        .build();
            }

            return null;
        }

        private Gist createGist(User user) {
            List<GithubGist> githubGists = githubClient.getGithubGists(user.getUserName());
            if (githubGists.size() > 0) {
                GithubGist githubGist = githubGists.get(0);

                return Gist.builder()
                        .gistId(githubGist.getId())
                        .gistDescription(githubGist.getDescription())
                        .uploadDate(githubGist.getCreatedAt())
                        .markdown("# sample")
                        .user(user)
                        .build();
            }
            return null;
        }

        private Image createImage(User user, String imageFilename) {
            return Image.builder()
                    .imageFilename(imageFilename)
                    .markdown("# sample")
                    .user(user)
                    .build();
        }

        private Follow createFollow(User following, User follower) {
            return Follow.builder()
                    .following(following)
                    .follower(follower)
                    .build();
        }
    }
}
