package com.project.backend.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.json.simple.JSONObject;

import com.project.backend.DTO.BoardDTO;
import com.project.backend.DTO.UserDTO;

public interface MapperInterface {
    //user
    public UserDTO MappingTest(String useremail) throws Exception;

    public UserDTO submitLogin(String useremail) throws Exception;

    public UserDTO verifyLogin(String useremail) throws Exception;

    public void insertUser(JSONObject registerInfo) throws Exception;

    public int checkUniqueEmail(String useremail) throws Exception;

    //board

    public void registerBoard(BoardDTO boarddto) throws Exception;

    public BoardDTO selectBoard(int bid) throws Exception;

    public List<BoardDTO> getAll() throws Exception;

    public BoardDTO getDetail(int bid) throws Exception;

    public void postImage(String fileName) throws Exception;

    public List<BoardDTO> listPage(Map<String,Object> paramMap) throws Exception;
 }
