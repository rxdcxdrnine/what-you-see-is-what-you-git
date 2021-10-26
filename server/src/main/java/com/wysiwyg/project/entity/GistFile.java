package com.wysiwyg.project.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class GistFile extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gistFileId;

    @Column(name = "gist_file_name")
    private String filename;

    @Builder
    public GistFile(String filename) {
        this.filename = filename;
    }
}
