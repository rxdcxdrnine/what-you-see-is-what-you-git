package com.wysiwyg.project.repository;

import com.wysiwyg.project.entity.CommitFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommitFileRepository extends JpaRepository<CommitFile, Long> {

}
