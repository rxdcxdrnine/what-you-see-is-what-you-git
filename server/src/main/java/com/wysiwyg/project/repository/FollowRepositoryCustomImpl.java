package com.wysiwyg.project.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.wysiwyg.project.dto.FollowFetchDto;
import com.wysiwyg.project.dto.FollowSaveDto;
import com.wysiwyg.project.dto.QFollowFetchDto;
import com.wysiwyg.project.entity.Follow;
import com.wysiwyg.project.entity.QFollow;
import com.wysiwyg.project.entity.QUser;
import com.wysiwyg.project.entity.User;
import lombok.RequiredArgsConstructor;

import javax.persistence.EntityManager;
import java.util.List;

import static com.wysiwyg.project.entity.QFollow.*;

@RequiredArgsConstructor
public class FollowRepositoryCustomImpl implements FollowRepositoryCustom {

    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    @Override
    public void create(FollowSaveDto dto) {

        if (isExist(dto)) {
            throw new Error("DuplicateError");
        }

        User following = em.getReference(User.class, dto.getFollowingId());
        User follower = em.getReference(User.class, dto.getFollowerId());

        Follow follow = dto.toEntity(following, follower);
        em.persist(follow);

        following.addFollowing(follow);
        follower.addFollower(follow);

        em.persist(following);
        em.persist(follower);
    }

    @Override
    public boolean isExist(FollowSaveDto dto) {
        QUser followingUser = new QUser("following");
        QUser followerUser = new QUser("follower");

        boolean isEmpty = queryFactory
                .selectFrom(follow)
                .join(follow.following, followingUser)
                .join(follow.follower, followerUser)
                .where(followingUser.userId.eq(dto.getFollowingId()),
                        followerUser.userId.eq(dto.getFollowerId()))
                .fetch()
                .isEmpty();

        return !isEmpty;
    }

    @Override
    public void delete(Long followId) {
        QUser followingUser = new QUser("following");
        QUser followerUser = new QUser("follower");

        Follow follow = queryFactory
                .selectFrom(QFollow.follow)
                .join(QFollow.follow.following, followingUser).fetchJoin()
                .join(QFollow.follow.follower, followerUser).fetchJoin()
                .where(QFollow.follow.followId.eq(followId))
                .fetchOne();

        User following = follow.getFollowing();
        User follower = follow.getFollower();

        em.remove(follow);

        following.deleteFollowing(follow);
        follower.deleteFollower(follow);

        em.persist(following);
        em.persist(follower);
    }

    @Override
    public List<FollowFetchDto> findFollowersByFollowingId(Long followingId) {
        QUser followerUser = new QUser("follower");

        return queryFactory
                .select(new QFollowFetchDto(
                        follow.followId,
                        followerUser.userId,
                        followerUser.userName,
                        followerUser.profileName,
                        followerUser.avatarUrl
                ))
                .from(follow)
                .join(follow.follower, followerUser)
                .where(follow.following.userId.eq(followingId))
                .fetch();
    }

    @Override
    public List<FollowFetchDto> findFollowingsByFollowerId(Long followerId) {
        QUser followingUser = new QUser("following");

        return queryFactory
                .select(new QFollowFetchDto(
                        follow.followId,
                        followingUser.userId,
                        followingUser.userName,
                        followingUser.profileName,
                        followingUser.avatarUrl
                ))
                .from(follow)
                .join(follow.following, followingUser)
                .where(follow.follower.userId.eq(followerId))
                .fetch();
    }
}
