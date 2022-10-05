package com.project.backend.Controller;

import java.io.File;
import java.util.*;

import javax.annotation.Resource;
import javax.xml.ws.Response;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.project.backend.DTO.BoardDTO;
import com.project.backend.mapper.MapperInterface;

@RestController
@RequestMapping("/board")
public class BoardController {


    private String fileuploadPath = "C:\\uploadfiles\\upload";

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

    @RequestMapping(value = "/ImagePost",method = (RequestMethod.POST))
    public @ResponseBody ResponseEntity<List<JSONObject>> registerImg(@RequestParam("fileupload[]") List<MultipartFile> images)throws Exception{
        
        System.out.println("doesitcalled");
        
        File upFolderPath = new File(fileuploadPath);
		if(upFolderPath.exists() == false) {
			upFolderPath.mkdirs();
		}
        List<JSONObject> entities = new ArrayList<JSONObject>();

        HttpHeaders responseHeaders = new HttpHeaders();
        for(MultipartFile file : images){
            
            JSONObject entity = new JSONObject();

            entity.put("filename", Utils.uploadFile(fileuploadPath, file.getOriginalFilename(), file.getBytes()));

            entities.add(entity);
            
        }

       responseHeaders.add("Content-Type", "application/json; charset=utf-8");
       return new ResponseEntity<List<JSONObject>>(entities,responseHeaders,HttpStatus.CREATED);

    }

}