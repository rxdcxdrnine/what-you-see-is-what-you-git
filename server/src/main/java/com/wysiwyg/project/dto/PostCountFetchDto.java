package com.wysiwyg.project.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Data
public class PostCountFetchDto {

    private LocalDate date;
    private Long count;

    @QueryProjection
    public PostCountFetchDto(String date, Long count) {
        this.date = LocalDate.parse(date, DateTimeFormatter.ISO_LOCAL_DATE);
        this.count = count;
    }
}
