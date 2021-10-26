package com.wysiwyg.project.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.wysiwyg.project.entity.Commit;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.wysiwyg.project.entity.QCommit.*;
import static com.wysiwyg.project.entity.QCommitFile.*;

@RequiredArgsConstructor
public class CommitRepositoryCustomImpl implements CommitRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Commit> searchByPostId(Long postId) {
        return queryFactory
                .selectFrom(commit)
                .join(commit.commitFiles, commitFile).fetchJoin()
                .where(commit.push.postId.eq(postId))
                .distinct()
                .fetch();
    }
}
