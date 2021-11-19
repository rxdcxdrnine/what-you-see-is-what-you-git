package com.wysiwyg.project.repository;

import com.wysiwyg.project.entity.Gist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GistPostRepository extends JpaRepository<Gist, Long> {

}
