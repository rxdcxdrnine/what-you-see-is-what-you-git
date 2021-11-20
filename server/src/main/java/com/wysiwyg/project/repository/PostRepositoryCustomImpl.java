package com.wysiwyg.project.repository;

import com.querydsl.core.QueryResults;
import com.querydsl.core.types.ConstantImpl;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringTemplate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.wysiwyg.project.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.wysiwyg.project.entity.QPost.*;
import static com.wysiwyg.project.entity.QUser.user;

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

    public List<PostCountDto> countByDate(UserSearchCondition condition) {
        return queryFactory
                .select(new QPostCountDto(formattedDate, post.count()))
                .from(post)
                .where(userIdEq(condition.getUserId()))
                .groupBy(formattedDate)
                .fetch();
    }

    public Page<PostFetchDto> searchByUserId(PostSearchCondition condition, Pageable pageable) {

        QueryResults<PostFetchDto> results = queryFactory
                .select(new QPostFetchDto(post))
                .from(post)
                .where(post.user.userId.eq(condition.getUserId()),
                        regDateEq(condition.getRegDate()),
                        typeEq(condition.getType()))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();

        List<PostFetchDto> content = results.getResults();
        Long total = results.getTotal();

        return new PageImpl<>(content, pageable, total);
    }

    private BooleanExpression userIdEq(Long userId) {
        return userId == null ? null : user.userId.eq(userId);
    }

    private BooleanExpression githubIdEq(Long githubId) {
        return githubId == null ? null : user.githubId.eq(githubId);
    }

    private BooleanExpression regDateEq(String regDate) {
        return regDate == null ? null : formattedDate.eq(regDate);
    }

    private BooleanExpression typeEq(String type) {
        return type == null ? null : post.type.eq(type);
    }
}
