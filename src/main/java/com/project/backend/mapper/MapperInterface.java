package com.project.backend.mapper;

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
 }
