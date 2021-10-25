package com.wysiwyg.project.repository;

import com.wysiwyg.project.entity.Gist;

import java.util.List;

public interface GistPostRepositoryCustom {

    List<Gist> searchByUserId(Long userId);
}
