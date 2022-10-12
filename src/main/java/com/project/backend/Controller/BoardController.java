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
import com.project.backend.mapper.MapperInterface;

@RestController
@RequestMapping("/board")
public class BoardController {

    private String fileuploadPath = "C:\\uploadfiles\\upload";

    @Autowired
    MapperInterface mapper;

    @RequestMapping(value = "/getList", method = { RequestMethod.GET })
    public ResponseEntity<List<BoardDTO>> List(@PathVariable(required = false) String btype) {
        ResponseEntity<List<BoardDTO>> entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        String type = btype;

        if (type != null) {

        }
        try {
            List<BoardDTO> listAll = mapper.getAll();
            System.out.println(listAll.toString());
            return entity = new ResponseEntity<List<BoardDTO>>(listAll, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("erroroccurs");
        }

        return entity;

    }

    @RequestMapping(value = "/getDetail", method = { RequestMethod.GET })
    public ResponseEntity<BoardDTO> Detail(@RequestParam int bid) {

        ResponseEntity<BoardDTO> entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        try {
            System.out.println("paramis"+bid);
            BoardDTO boarddto = mapper.getDetail(bid);
            System.out.println("boarddtois-"+boarddto);
            return entity = new ResponseEntity<BoardDTO>(boarddto, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("failed");
        }
        System.out.println();

        return entity;
    }

    @RequestMapping(value = "/Register", method = { RequestMethod.POST })
    public ResponseEntity<String> register(@RequestBody BoardDTO boarddto) {

        ResponseEntity<String> entity = null;
        try {
            mapper.registerBoard(boarddto);
            System.out.println("boardRegisterSuccess");
        } catch (Exception e) {
            e.printStackTrace();
            return entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return entity = new ResponseEntity<String>(HttpStatus.OK);
    }

    @RequestMapping(value = "/ImagePost", method = (RequestMethod.POST))
    public @ResponseBody ResponseEntity<List<JSONObject>> registerImg(
            @RequestParam("fileupload[]") List<MultipartFile> images) throws Exception {

        System.out.println("doesitcalled");

        File upFolderPath = new File(fileuploadPath);
        if (upFolderPath.exists() == false) {
            upFolderPath.mkdirs();
        }
        List<JSONObject> entities = new ArrayList<JSONObject>();

        HttpHeaders responseHeaders = new HttpHeaders();
        for (MultipartFile file : images) {

            JSONObject entity = new JSONObject();

            String fileName = Utils.uploadFile(fileuploadPath, file.getOriginalFilename(), file.getBytes());

            entity.put("filename", fileName);

            mapper.postImage(fileName);

            entities.add(entity);

        }

        responseHeaders.add("Content-Type", "application/json; charset=utf-8");
        return new ResponseEntity<List<JSONObject>>(entities, responseHeaders, HttpStatus.CREATED);

    }

}