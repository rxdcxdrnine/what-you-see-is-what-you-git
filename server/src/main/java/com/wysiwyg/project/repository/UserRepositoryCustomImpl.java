package com.wysiwyg.project.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.wysiwyg.project.dto.QUserFetchDto;
import com.wysiwyg.project.dto.UserFetchDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.wysiwyg.project.entity.QUser.*;

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
}
