package com.project.backend.DTO;

import java.util.Date;

import lombok.Data;
@Data
public class BoardDTO {
    private int bid;
    private String title;
    private String content;
    private Date reg_Date;
    private String reg_User;
    private Date update_Date;
    private String update_User;
    private String viewcount;
}
