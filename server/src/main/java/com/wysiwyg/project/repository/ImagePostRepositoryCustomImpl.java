package com.wysiwyg.project.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.wysiwyg.project.entity.Image;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.wysiwyg.project.entity.QImage.*;
import static com.wysiwyg.project.entity.QUser.*;

@RequiredArgsConstructor
public class ImagePostRepositoryCustomImpl implements ImagePostRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Image> searchByUserId(Long userId) {
        return queryFactory.selectFrom(image)
                .join(image.user, user)
                .where(user.userId.eq(userId))
                .fetch();
    }
}
