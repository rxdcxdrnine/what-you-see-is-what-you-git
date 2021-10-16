package com.wysiwyg.project.controller;

import com.wysiwyg.project.dto.GistPostSaveDto;
import com.wysiwyg.project.dto.ImagePostSaveDto;
import com.wysiwyg.project.dto.PushPostSaveDto;
import com.wysiwyg.project.service.GIstPostService;
import com.wysiwyg.project.service.ImagePostService;
import com.wysiwyg.project.service.PushPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
public class PostController {

    private final PushPostService pushPostService;
    private final GIstPostService gistPostService;
    private final ImagePostService imagePostService;

    @PostMapping("/push")
    public void savePushPost(@RequestBody PushPostSaveDto dto) {
        pushPostService.save(dto);
    }

    @PostMapping("/gist")
    public void saveGistPost(@RequestBody GistPostSaveDto dto) {
        gistPostService.save(dto);
    }

    @PostMapping("/image")
    public void saveImagePost(ImagePostSaveDto dto) { imagePostService.save(dto); }
}
