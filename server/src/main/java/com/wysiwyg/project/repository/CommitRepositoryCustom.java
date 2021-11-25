package com.wysiwyg.project.repository;

import com.wysiwyg.project.entity.Commit;

import java.util.List;

public interface CommitRepositoryCustom {

    List<Commit> searchByPostId(Long postId);
}
