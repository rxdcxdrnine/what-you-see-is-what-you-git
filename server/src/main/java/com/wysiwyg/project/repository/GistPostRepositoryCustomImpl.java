package com.wysiwyg.project.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.wysiwyg.project.entity.Gist;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.wysiwyg.project.entity.QGist.*;
import static com.wysiwyg.project.entity.QUser.*;

@RequiredArgsConstructor
public class GistPostRepositoryCustomImpl implements GistPostRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Gist> searchByUserId(Long userId) {
        return queryFactory.selectFrom(gist)
                .join(gist.user, user)
                .where(user.userId.eq(userId))
                .fetch();
    }
}
