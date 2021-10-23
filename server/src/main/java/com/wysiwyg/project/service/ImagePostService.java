package com.wysiwyg.project.service;

import com.wysiwyg.project.dto.ImagePostSaveDto;
import com.wysiwyg.project.entity.Image;
import com.wysiwyg.project.repository.ImagePostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
@RequiredArgsConstructor
public class ImagePostService {

    private final ImagePostRepository imagePostRepository;

    @Value("${app.upload.dir:${user.home}}")
    private String uploadDir;

    public void save(ImagePostSaveDto dto) {
        // save image file
        fileUpload(dto.getImage());

        // save image entity
        Image image = dto.toEntity();
        imagePostRepository.save(image);
    }

    public void fileUpload(MultipartFile multipartFile)  {
        Path copyOfLocation = Paths.get(uploadDir + File.separator + StringUtils.cleanPath(multipartFile.getOriginalFilename()));
        try {
            Files.copy(multipartFile.getInputStream(), copyOfLocation, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
