package com.project.backend;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


public class BcryptService {

    
    public String encodeBcrypt(String planeText,int strength){
        return new BCryptPasswordEncoder(strength).encode(planeText);
    }

    public boolean matchesBcrypt(String planeText,String hashValue /*  , int strength*/){
        int strength = 10;
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(strength);
        return passwordEncoder.matches(planeText, hashValue);
    }
}
