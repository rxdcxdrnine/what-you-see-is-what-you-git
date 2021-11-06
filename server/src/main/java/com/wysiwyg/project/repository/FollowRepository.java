package com.wysiwyg.project.repository;

import com.wysiwyg.project.entity.Follow;
import com.wysiwyg.project.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, Long>, FollowRepositoryCustom {
}
