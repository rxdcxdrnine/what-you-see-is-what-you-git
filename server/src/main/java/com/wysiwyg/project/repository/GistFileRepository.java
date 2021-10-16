package com.wysiwyg.project.repository;

import com.wysiwyg.project.entity.GistFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GistFileRepository extends JpaRepository<GistFile, Long> {
}
