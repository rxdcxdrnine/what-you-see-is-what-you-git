package com.wysiwyg.project.service;

import com.wysiwyg.project.dto.ImagePostFetchDto;
import com.wysiwyg.project.dto.ImagePostSaveDto;
import com.wysiwyg.project.entity.Image;
import com.wysiwyg.project.entity.User;
import com.wysiwyg.project.repository.ImagePostRepository;
import com.wysiwyg.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
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
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ImagePostService {

    private final ImagePostRepository imagePostRepository;
    private final UserRepository userRepository;

    @Value("${app.upload.dir:${user.home}}")
    private String uploadDir;

    public void save(ImagePostSaveDto dto) {
        // find user
        Optional<User> user = userRepository.findById(dto.getUserId());

        // save image file
        String filename = fileUpload(dto.getImage());

        // save image entity
        Image image = dto.toEntity(filename, user.get());
        imagePostRepository.save(image);
    }

    public String fileUpload(MultipartFile multipartFile)  {
        String ext = FilenameUtils.getExtension(multipartFile.getOriginalFilename());
        String filename = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date()) + "." + ext;
        Path copyOfLocation = Paths.get(uploadDir + StringUtils.cleanPath(filename));
        try {
            Files.copy(multipartFile.getInputStream(), copyOfLocation, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return filename;
    }
}
