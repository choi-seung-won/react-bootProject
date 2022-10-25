package com.project.backend.Controller;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.*;
import org.springframework.http.MediaType;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.project.backend.DTO.BoardDTO;
import com.project.backend.DTO.CommentDTO;
import com.project.backend.DTO.FileNameDTO;
import com.project.backend.mapper.MapperInterface;
import org.apache.commons.io.IOUtils;

@RestController
public class PageController {

    
    @Autowired
    MapperInterface mapper;

    @RequestMapping(value = "/selectrandomimage", method = RequestMethod.GET)
    public ResponseEntity<?> List(){
        ResponseEntity<?> entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        try{
            List<String> obj = mapper.selectrandomimage(5);
            entity = new ResponseEntity<List<String>>(obj,HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
        }
        return entity;
    }

    @RequestMapping(value="/selecttoptenBoard", method=RequestMethod.GET)
    public ResponseEntity<?> selecttoptenBoard() {
        
        ResponseEntity<?> entity = null;

        try{
            List<BoardDTO> listedboarddto = mapper.selecttoptenBoard();
            entity = new ResponseEntity<List<BoardDTO>>(listedboarddto,HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
        return entity;
    }

    @RequestMapping(value="/dailyBoard",method= RequestMethod.GET)
    public ResponseEntity<?> dailyBoard(){

        ResponseEntity<?> entity = null;

        try{
            List<BoardDTO> listedboarddto = mapper.dailyBoard();
            entity = new ResponseEntity<List<BoardDTO>>(listedboarddto, HttpStatus.OK);

        }catch(Exception e){
            entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return entity;
    }
    
}
