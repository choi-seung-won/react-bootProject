package com.project.backend.Controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.*;

import javax.annotation.Resource;
import javax.xml.ws.Response;

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
import com.project.backend.mapper.MapperInterface;
import org.apache.commons.io.IOUtils;

@RestController
@RequestMapping("/board")
public class BoardController {

    private String fileuploadPath = 
    //"C:\\uploadfiles\\upload";
    "frontend\\public\\uploadStorage";
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
            mapper.updateBoard(bid);
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

    @RequestMapping(value = "/getDetailImg",method = {RequestMethod.GET})
    public List<String> DetailImg(@RequestParam int bid) throws Exception{
        System.out.println("getdetailimg"+mapper.getAttach(bid).toString());
        return mapper.getAttach(bid);
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

    @ResponseBody
	@RequestMapping("/displayFile")
	public ResponseEntity<byte[]> displayFile(@RequestParam("fileName") String savedFileName) throws Exception {

		InputStream is = null;
		ResponseEntity<byte[]> entity = null;

		try {

			String formatName = savedFileName.substring(savedFileName.lastIndexOf(".") + 1);

			MediaType mType = MediaUtils.getMediaType(formatName);

			HttpHeaders headers = new HttpHeaders();

			is = new FileInputStream(fileuploadPath + savedFileName);

			if (mType != null) {
				headers.setContentType(mType);
			} else {

				savedFileName = savedFileName.substring(savedFileName.indexOf("_") + 1);
				headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
				headers.add("Content-Disposition",
						"attachment; filename=\"" + new String(savedFileName.getBytes("UTF-8"), "ISO-8859-1") + "\"");
			}

			entity = new ResponseEntity<byte[]>(IOUtils.toByteArray(is), headers, HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<byte[]>(HttpStatus.BAD_REQUEST);
		} finally {
			is.close();
		}
		return entity;
	}

    @ResponseBody
	@RequestMapping(value = "/deleteAllFiles", method = RequestMethod.POST)
	public ResponseEntity<String> deleteFile(@RequestParam("files") String[] files) {

		//System.out.println("nowdeletefiles"+files.toString());
		if (files == null || files.length == 0) {
			return new ResponseEntity<String>("deleted", HttpStatus.OK);
		}

		for (String fileName : files) {
			//System.out.println("filenames: " + fileName);
			String fName = fileName.substring(30);
			//goturltoo
			String formatName = fileName.substring(fileName.lastIndexOf(".") + 1);
			//System.out.println("formatnames" + formatName);
			MediaType mType = MediaUtils.getMediaType(formatName);

			
			
			if(mType != null) {
				//String front = fileName.substring(0,42);
				//System.out.println(end);
				//File temp = new File(fileuploadPath + (front).replace('/', File.separatorChar));
				//System.out.println("refinename:"+temp.getName());
				//temp.delete();
				System.out.println(fileuploadPath + fName.replace('/', File.separatorChar));
				new File(fileuploadPath + fName.replace('/', File.separatorChar)).delete();
			}
			
		}
		return new ResponseEntity<String>("deleted", HttpStatus.OK);
	}

    @RequestMapping(value = "/postComment", method = RequestMethod.POST)
    public ResponseEntity<?> postComment(@RequestBody CommentDTO commentdto){
        //jsonobject?
        System.out.println(commentdto);
        try{
            mapper.postComment(commentdto);
        }
        catch(Exception e){
            e.printStackTrace();
        }

        return null;

    }
    
}