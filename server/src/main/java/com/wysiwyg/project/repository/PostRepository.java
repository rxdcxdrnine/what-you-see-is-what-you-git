package com.wysiwyg.project.repository;

import com.wysiwyg.project.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long>, PostRepositoryCustom {

     Long deleteByPostId(Long postId);
}
