package com.wysiwyg.project.repository;

import com.wysiwyg.project.entity.Push;

import java.util.List;

public interface PushPostRepositoryCustom {

    List<Push> searchByUserId(Long userId);
}
