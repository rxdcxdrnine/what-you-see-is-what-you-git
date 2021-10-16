package com.wysiwyg.project.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("IMAGE")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@ToString
public class Image extends Post {

    private String imageFilename;

    @Builder
    public Image(String imageFilename, String markdown) {
        super(null, markdown);
        this.imageFilename = imageFilename;
    }
}
