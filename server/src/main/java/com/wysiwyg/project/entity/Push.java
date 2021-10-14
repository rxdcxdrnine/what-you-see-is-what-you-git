package com.wysiwyg.project.entity;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("PUSH")
@Getter
@ToString
public class Push extends Post {

    @Column(nullable = false)
    private int pushId;

    @Column(nullable = false)
    private String repositoryName;

    @Column(nullable = false)
    private String branchName;
}
