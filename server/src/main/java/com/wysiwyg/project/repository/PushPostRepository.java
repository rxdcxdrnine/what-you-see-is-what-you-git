package com.wysiwyg.project.repository;

import com.wysiwyg.project.entity.Push;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PushPostRepository extends JpaRepository<Push, Long> {
}
