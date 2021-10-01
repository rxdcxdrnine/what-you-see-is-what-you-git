package com.wysiwyg.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class WysiwygApplication {

    public static void main(String[] args) {
        SpringApplication.run(WysiwygApplication.class, args);
    }

}
