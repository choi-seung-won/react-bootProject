package com.project.backend;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class sampleController {
    
    @GetMapping("hello")
    public List<String> hello(){
        return Arrays.asList("he11o","hello");
    }
}
