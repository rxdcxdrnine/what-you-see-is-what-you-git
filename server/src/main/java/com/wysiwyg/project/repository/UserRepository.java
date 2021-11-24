package com.wysiwyg.project.repository;

import com.wysiwyg.project.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom {

    Optional<User> findByUserName(String userName);
    Optional<User> findByGithubId(Long githubId);

}
