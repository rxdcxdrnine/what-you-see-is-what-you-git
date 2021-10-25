package com.wysiwyg.project.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.wysiwyg.project.entity.Push;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.wysiwyg.project.entity.QPush.*;
import static com.wysiwyg.project.entity.QUser.*;

@RequiredArgsConstructor
public class PushPostRepositoryCustomImpl implements PushPostRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Push> searchByUserId(Long userId) {
        return queryFactory.selectFrom(push)
                .join(push.user, user)
                .where(user.userId.eq(userId))
                .fetch();
    }
}
