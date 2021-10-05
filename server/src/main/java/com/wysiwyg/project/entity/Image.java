package com.wysiwyg.project.entity;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("IMAGE")
@Getter
@ToString
public class Image extends Post {

    @Column(nullable = false)
    private String imageFilename;
}
