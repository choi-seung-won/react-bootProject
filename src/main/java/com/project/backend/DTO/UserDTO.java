package com.project.backend.DTO;

import java.util.Date;

import lombok.Data;
@Data
public class UserDTO {
    private String username;
    private String userorg;
    private String useremail;
    private String userpassword;
    private String usermajor;
    private String userphone;
    private String userflag;
    private Date reg_Date;
    private String reg_User;
    private Date update_Date;
    private String update_User;
}