package com.wysiwyg.project.repository;

import com.wysiwyg.project.entity.Push;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PushPostRepository extends JpaRepository<Push, Long> {

    List<Push> findByUserUserId(Long userId);

}
