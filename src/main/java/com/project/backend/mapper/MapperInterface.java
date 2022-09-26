package com.project.backend.mapper;

import org.apache.ibatis.annotations.Param;

import com.project.backend.DTO.UserDTO;

public interface MapperInterface {
    public UserDTO MappingTest(String useremail) throws Exception;

    public UserDTO submitLogin(String useremail) throws Exception;
    
 }
