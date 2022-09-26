package com.project.backend;

import java.util.Map;

import org.apache.tomcat.util.json.JSONParser;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.GsonJsonParser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.project.backend.DTO.UserDTO;
import com.project.backend.mapper.MapperInterface;
@RestController
public class TestClass {
    //@Autowired    private DataSource ds;
    @Autowired
    MapperInterface mapper;
    
    @GetMapping("/TestCode")
    public void mapperTest(@RequestParam("Email") String useremail) throws Exception{
        UserDTO userdto = mapper.MappingTest(useremail);
        //UserDTO userdto = mapper.MappingTest("user1@naver.com");
        System.out.println(userdto.getUsername());   
    }

    @RequestMapping(value = "/TestingCode", method={RequestMethod.POST})
    public ResponseEntity<UserDTO> frontEndTest(@RequestBody Map<String,String> Email){
        ResponseEntity<UserDTO> entity = null;
        String useremail = Email.get("Email");
        try{
            UserDTO userdto = mapper.MappingTest(useremail);
            entity = new ResponseEntity<>(userdto, HttpStatus.OK);
            //System.out.println(userdto.toString());  
        }
        catch(Exception e){
            e.printStackTrace();
            entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
        return entity;
    }
}
