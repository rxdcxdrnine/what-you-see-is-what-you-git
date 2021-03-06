package com.wysiwyg.project.repository;

import com.wysiwyg.project.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImagePostRepository extends JpaRepository<Image, Long> {

}
