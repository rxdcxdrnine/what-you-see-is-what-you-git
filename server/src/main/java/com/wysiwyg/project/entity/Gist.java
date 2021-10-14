package com.wysiwyg.project.entity;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
@DiscriminatorValue("GIST")
@Getter
@ToString
public class Gist extends Post {

    @Column(nullable = false)
    private int gistId;

    @Column(nullable = false)
    private String gistDescription;
}
