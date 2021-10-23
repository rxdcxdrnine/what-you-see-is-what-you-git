package com.wysiwyg.project.repository;

import com.wysiwyg.project.entity.Commit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommitRepository extends JpaRepository<Commit, Long> {
}
