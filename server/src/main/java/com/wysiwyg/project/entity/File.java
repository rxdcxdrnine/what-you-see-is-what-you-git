package com.wysiwyg.project.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@ToString
public class File extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fileId;

    @Column(nullable = false)
    private String fileSha;

    @Column(nullable = false)
    private String fileStatus;

    @Column(nullable = false)
    private String patch;

    @Column(nullable = false)
    private Integer additions;

    @Column(nullable = false)
    private Integer deletions;

    @ManyToOne
    @JoinColumn(name = "commit_id")
    private Commit commit;
}
