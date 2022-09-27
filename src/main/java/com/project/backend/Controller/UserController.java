package com.project.backend.Controller;

import java.util.Map;

import javax.servlet.http.Cookie;
import javax.swing.text.html.parser.Entity;
import javax.xml.ws.Response;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.backend.BcryptService;
import com.project.backend.DTO.UserDTO;
import com.project.backend.mapper.MapperInterface;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class UserController {
    
    @Autowired
    MapperInterface mapper;

    @RequestMapping(value = "/RequestTest",method={RequestMethod.POST})
    public ResponseEntity<UserDTO> testt(@RequestBody Map<String,String> string){
            System.out.println("itsnotnull");
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/loginVerify", method = {RequestMethod.POST})
    public ResponseEntity<UserDTO> login(@RequestBody Map<String,String> Logininfo){
    
        BcryptService bcryptService = new BcryptService();

        String useremail = Logininfo.get("Email");
        String cryptedPassword = Logininfo.get("Password");

        UserDTO userDTO;
        ResponseEntity<UserDTO> entity = null;

        ObjectMapper objmapper = new ObjectMapper();
        //JSONObject dtoToJson = new JSONObject();
        try {
            //userDTO = mapper.submitLogin(useremail);
            userDTO = mapper.verifyLogin(useremail);
            System.out.println(objmapper.writeValueAsString(userDTO));

            if(userDTO == null){
                return entity = new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

            boolean doesItMatch = bcryptService.matchesBcrypt(cryptedPassword,mapper.submitLogin(useremail).getUserpassword());

            if(doesItMatch){
                userDTO = mapper.submitLogin(useremail);
                entity = new ResponseEntity<>(userDTO,HttpStatus.OK);
            }else{
                //401Error
                return entity = new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            e.printStackTrace();
            entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return entity;
    }

    @RequestMapping(value="/Register", method=RequestMethod.POST)
    public ResponseEntity<String> UserRegister(@RequestBody UserDTO userDTO) {
        mapper.insertUser(userDTO);
        
        

        return void;

    }

    @RequestMapping(value="/dplicheck",method = RequestMethod.POST)
    public ResponseEntity DuplicationCheck(@RequestBody UserDTO userdto){
        
        
        return null;

        
    }
    

}
