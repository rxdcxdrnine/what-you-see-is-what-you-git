package com.wysiwyg.project.repository;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.ConstantImpl;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringTemplate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.wysiwyg.project.dto.QUserFetchDto;
import com.wysiwyg.project.dto.UserFetchDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.wysiwyg.project.entity.QUser.*;
import static com.wysiwyg.project.entity.QPost.*;

@Repository
@RequiredArgsConstructor
public class UserRepositoryCustomImpl implements UserRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<UserFetchDto> searchByUserName(String userName) {
        return queryFactory
                .select(new QUserFetchDto(
                        user.userId,
                        user.userName,
                        user.profileName,
                        user.avatarUrl
                ))
                .from(user)
                .where(user.userName.contains(userName))
                .fetch();
    }

    @Override
    public UserFetchDto searchByUserId(Long githubId) {

        StringTemplate formattedDate = Expressions.stringTemplate(
                "DATE_FORMAT({0}, {1})"
                , post.regDate
                , ConstantImpl.create("%Y-%m-%d"));

        UserFetchDto dto = queryFactory
                .select(new QUserFetchDto(
                        user.userId,
                        user.userName,
                        user.profileName,
                        user.avatarUrl,
                        user.followingNum,
                        user.followerNum
                ))
                .from(user)
                .where(user.githubId.eq(githubId))
                .fetchOne();

        List<Tuple> tuples = queryFactory
                .select(formattedDate, post.postId)
                .from(post)
                .join(post.user, user)
                .where(user.githubId.eq(githubId))
                .groupBy(formattedDate)
                .fetch();

        dto.setDayNum(tuples.size());
        return dto;
    }
}
