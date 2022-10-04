package com.project.backend.Controller;

import java.util.*;

import javax.xml.ws.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.DTO.BoardDTO;
import com.project.backend.mapper.MapperInterface;

@RestController
@RequestMapping("/board")
public class BoardController {

    @Autowired
    MapperInterface mapper;

    @RequestMapping(value = "/Register",method = {RequestMethod.POST})
    public ResponseEntity<String> register(@RequestBody BoardDTO boarddto){
        
        ResponseEntity<String> entity = null;
        try{
            mapper.registerBoard(boarddto);
            System.out.println("boardRegisterSuccess");
        }catch(Exception e){
            e.printStackTrace();
            return entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return entity = new ResponseEntity<String>(HttpStatus.OK);
    }

}