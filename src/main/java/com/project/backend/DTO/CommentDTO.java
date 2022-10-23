package com.project.backend.DTO;

import java.util.Date;

import lombok.Data;

@Data
public class CommentDTO {
    private int cno;
    private String content;
    private String username;
    private Date reg_Date;
    private int bid;
}
