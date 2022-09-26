package com.project.backend.Controller;

import java.util.Map;

import javax.servlet.http.Cookie;
import javax.swing.text.html.parser.Entity;
import javax.xml.ws.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.BcryptService;
import com.project.backend.DTO.UserDTO;
import com.project.backend.mapper.MapperInterface;

@RestController
public class UserController {
    
    @Autowired
    MapperInterface mapper;

    @RequestMapping(value = "/login")
    public ResponseEntity<UserDTO> login(@CookieValue(value="cookieId",required = false)Cookie cookie,@RequestBody Map<String,String> Logininfo){
    
        BcryptService bcryptService = new BcryptService();

        String useremail = Logininfo.get("Email");
        String cryptedPassword = Logininfo.get("Password");
        
        UserDTO userDTO;
        ResponseEntity<UserDTO> entity = null;

        try {
            
            if(bcryptService.matchesBcrypt(cryptedPassword,mapper.submitLogin(useremail).getUserpassword())){
                userDTO = mapper.submitLogin(useremail);
                entity = new ResponseEntity<>(userDTO,HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return entity;
    }

}
