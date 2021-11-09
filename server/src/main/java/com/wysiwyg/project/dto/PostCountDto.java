package com.wysiwyg.project.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Data
public class PostCountDto {

    private LocalDate date;
    private Long count;

    @QueryProjection
    public PostCountDto(String date, Long count) {
        this.date = LocalDate.parse(date, DateTimeFormatter.ISO_LOCAL_DATE);
        this.count = count;
    }
}
