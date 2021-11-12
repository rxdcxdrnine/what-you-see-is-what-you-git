package com.wysiwyg.project.repository;

import com.querydsl.core.types.ConstantImpl;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringTemplate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.wysiwyg.project.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.wysiwyg.project.entity.QPost.*;

@Repository
@RequiredArgsConstructor
public class PostRepositoryCustomImpl implements PostRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    private StringTemplate formattedDate = Expressions.stringTemplate(
            "DATE_FORMAT({0}, {1})"
            , post.regDate
            , ConstantImpl.create("%Y-%m-%d"));

    public PostFetchDto searchByPostId(Long postId) {
        return queryFactory
                .select(new QPostFetchDto(post))
                .from(post)
                .where(post.postId.eq(postId))
                .fetchOne();
    }

    public List<PostCountDto> countByDate(Long userId) {
        return queryFactory
                .select(new QPostCountDto(formattedDate, post.count()))
                .from(post)
                .where(post.user.userId.eq(userId))
                .groupBy(formattedDate)
                .fetch();
    }

    public List<PostFetchDto> searchByUserId(PostSearchCondition condition) {

        return queryFactory
                .select(new QPostFetchDto(post))
                .from(post)
                .where(regDateEq(condition.getRegDate()),
                        post.user.userId.eq(condition.getUserId()))
                .fetch();
    }

    private BooleanExpression regDateEq(String regDate) {
        return regDate == null ? null : formattedDate.eq(regDate);
    }
}