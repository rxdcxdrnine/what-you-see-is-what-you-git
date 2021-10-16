package com.wysiwyg.project.entity;

import lombok.*;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.time.LocalDateTime;

@Entity
@DiscriminatorValue("GIST")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@ToString
public class Gist extends Post {

    private String gistId;

    private String gistDescription;

    @Builder
    public Gist(String gistId, String gistDescription, LocalDateTime uploadDate, String markdown) {
        super(uploadDate, markdown);
        this.gistId = gistId;
        this.gistDescription = gistDescription;
    }
}
