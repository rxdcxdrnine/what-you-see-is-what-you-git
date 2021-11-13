package com.wysiwyg.project.repository;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.ConstantImpl;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringTemplate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.wysiwyg.project.dto.QPostCountDto;
import com.wysiwyg.project.dto.QUserFetchDto;
import com.wysiwyg.project.dto.UserFetchDto;
import com.wysiwyg.project.dto.UserSearchCondition;
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
    public List<UserFetchDto> searchByUserName(UserSearchCondition condition) {
        return queryFactory
                .select(new QUserFetchDto(
                        user.userId,
                        user.userName,
                        user.profileName,
                        user.avatarUrl
                ))
                .from(user)
                .where(userIdNotEq(condition.getUserId()),
                        userNameContains(condition.getUserName()))
                .fetch();
    }

    @Override
    public UserFetchDto searchById(UserSearchCondition condition) {

        StringTemplate formattedDate = Expressions.stringTemplate(
                "DATE_FORMAT({0}, {1})"
                , post.regDate
                , ConstantImpl.create("%Y-%m-%d"));

        UserFetchDto dto = queryFactory
                .select(new QUserFetchDto(
                        user.userId,
                        user.githubId,
                        user.userName,
                        user.profileName,
                        user.avatarUrl,
                        user.followingNum,
                        user.followerNum
                ))
                .from(user)
                .where(userIdEq(condition.getUserId()),
                        githubIdEq(condition.getGithubId()))
                .fetchOne();

        return dto;
    }

    private BooleanExpression userIdEq(Long userId) {
        return userId == null ? null : user.userId.eq(userId);
    }

    private BooleanExpression githubIdEq(Long githubId) {
        return githubId == null ? null : user.githubId.eq(githubId);
    }

    private BooleanExpression userIdNotEq(Long userId) {
        return  userId == null ? null : user.userId.ne(userId);
    }

    private BooleanExpression userNameContains(String userName) {
        return userName == null ? null : user.userName.contains(userName);
    }

}
