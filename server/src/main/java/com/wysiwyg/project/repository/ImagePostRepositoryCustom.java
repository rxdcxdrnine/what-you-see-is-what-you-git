package com.wysiwyg.project.repository;

import com.wysiwyg.project.entity.Image;

import java.util.List;

public interface ImagePostRepositoryCustom {

    List<Image> searchByUserId(Long userId);
}
