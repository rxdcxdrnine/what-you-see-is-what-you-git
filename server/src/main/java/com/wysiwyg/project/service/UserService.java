package com.wysiwyg.project.service;

import com.wysiwyg.project.dto.PostCountDto;
import com.wysiwyg.project.dto.UserFetchDto;
import com.wysiwyg.project.dto.UserSearchCondition;
import com.wysiwyg.project.repository.PostRepository;
import com.wysiwyg.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public UserFetchDto searchByIdWithPostCounts(UserSearchCondition condition) {
        UserFetchDto userFetchDto = userRepository.searchById(condition);
        List<PostCountDto> postCountDtoList = postRepository.countByDate(condition);

        userFetchDto.setCounts(postCountDtoList);
        userFetchDto.setDayNum(postCountDtoList.size());
        return userFetchDto;
    }

}
