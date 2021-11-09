package com.wysiwyg.project.repository;

import com.querydsl.core.types.ConstantImpl;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringTemplate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.wysiwyg.project.dto.PostCountFetchDto;
import com.wysiwyg.project.dto.QPostCountFetchDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.wysiwyg.project.entity.QPost.*;
import static com.wysiwyg.project.entity.QUser.*;

@Repository
@RequiredArgsConstructor
public class PostRepository {

    private final JPAQueryFactory queryFactory;

    public List<PostCountFetchDto> countByDate(Long userId) {
        StringTemplate formattedDate = Expressions.stringTemplate(
                "DATE_FORMAT({0}, {1})"
                , post.regDate
                , ConstantImpl.create("%Y-%m-%d"));

        return queryFactory
                .select(new QPostCountFetchDto(formattedDate, post.count()))
                .from(post)
                .join(post.user, user)
                .where(user.userId.eq(userId))
                .groupBy(formattedDate)
                .fetch();
    }
}
