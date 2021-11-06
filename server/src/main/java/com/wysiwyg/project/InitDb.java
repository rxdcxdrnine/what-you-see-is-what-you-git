package com.wysiwyg.project;

import com.wysiwyg.project.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;

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
        }

        private User createUser(String userName, String profileName, String avatarUrl) {
            return User.builder()
                    .userName(userName)
                    .profileName(profileName)
                    .avatarUrl(avatarUrl)
                    .build();
        }
    }
}
