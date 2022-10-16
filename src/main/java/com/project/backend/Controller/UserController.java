package com.project.backend.Controller;

import java.util.Map;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.text.html.parser.Entity;
import javax.xml.ws.Response;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.io.JsonStringEncoder;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.backend.BcryptService;
import com.project.backend.DTO.UserDTO;
import com.project.backend.mapper.MapperInterface;

import ch.qos.logback.classic.Logger;
import io.jsonwebtoken.ExpiredJwtException;

import org.springframework.web.bind.annotation.RequestParam;

//jackson-databind는 boot의경우 spring-boot-starter-web에포함되어있음.

@RestController
public class UserController {
    
    @Autowired
    MapperInterface mapper;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @RequestMapping(value = "/RequestTest",method={RequestMethod.POST})
    public ResponseEntity<UserDTO> testt(@RequestBody Map<String,String> string){
            System.out.println("itsnotnull");
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/loginVerify", method = {RequestMethod.POST})
    public ResponseEntity<UserDTO> login(@RequestBody Map<String,String> Logininfo, HttpServletResponse response){
    
        BcryptService bcryptService = new BcryptService();

        String useremail = Logininfo.get("Email");
        String userPassword = Logininfo.get("Password");

        UserDTO userDTO;
        ResponseEntity<UserDTO> entity = null;

        ObjectMapper objmapper = new ObjectMapper();
        //JSONObject dtoToJson = new JSONObject();
        try {
            //userDTO = mapper.submitLogin(useremail);
            userDTO = mapper.verifyLogin(useremail);
            System.out.println(objmapper.writeValueAsString(userDTO));

            if(userDTO == null){
                return entity = new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

            boolean doesItMatch = bcryptService.matchesBcrypt(userPassword,mapper.submitLogin(useremail).getUserpassword().replace("\\/", "/"));

            if(doesItMatch){
                userDTO = mapper.submitLogin(useremail);
                entity = new ResponseEntity<>(userDTO,HttpStatus.OK);
                
                Cookie cookieSaveEmail = new Cookie("saveEmail", userDTO.getUseremail());
                cookieSaveEmail.setMaxAge(60 * 60);
                response.addCookie(cookieSaveEmail);
            }else{
                //401Error
                return entity = new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            e.printStackTrace();
            entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return entity;
    }

    @RequestMapping(value="/register", method=RequestMethod.POST)
    public ResponseEntity<?> UserRegister(@RequestBody JSONObject registerInfo) throws JsonMappingException, JsonProcessingException {
       
        System.out.println("registerinfotostring"+registerInfo.toString());

        ResponseEntity<?> entity;
                
        ObjectMapper objmapper = new ObjectMapper();
        
        String password = objmapper.writeValueAsString(registerInfo.get("is_Password"));

        password = password.replace("\"", "");

        //String password = (String)registerInfo.get("is_password");

        //System.out.println(String.valueOf(registerInfo.get("is_password")));

        BcryptService bcryptService = new BcryptService();


        //password saved with '\'(backslash)
        String cryptedpassword = bcryptService.encodeBcrypt(password, 10);

        System.out.println("cryptedpassword:"+cryptedpassword);

        registerInfo.put("is_Password", cryptedpassword); 

        System.out.println(registerInfo.toString());

        try {
            mapper.insertUser(registerInfo);
            System.out.println("mightbeokay");
            return entity = new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        /*

        if(registerInfo != null){

            String is_Userphone1 = registerInfo.get("is_userphone1").toString();

            String is_Userphone2 = registerInfo.get("is_Userphone2").toString();
            
            String is_Userphone3 = registerInfo.get("is_Userphone3").toString();

            String userphone = is_Userphone1 + '-' + is_Userphone2 + '-' + is_Userphone3;
            
            System.out.println(userphone);

        } */

        //UserDTO userdto = objmapper.convertValue(registerInfo, UserDTO.class);

        //System.out.println(userdto.toString());

        //    System.out.println("temp" + userdto.toString());


        /* try {
            mapper.insertUser(userDTO);
        } catch (Exception e) {
            e.printStackTrace();
        } */        
    }
    
    @RequestMapping(value="/dplicheck",method = RequestMethod.POST)
    public ResponseEntity<?> DuplicationCheck(@RequestBody Map<String,String> dplicheckInfo){
        
        ResponseEntity<String> entity = null;

        String Email = dplicheckInfo.get("is_Email");
        ObjectMapper objmapper = new ObjectMapper();
        try {
            String userEmail = objmapper.writeValueAsString(Email);
            userEmail = userEmail.replace("\"", "");
            
            //null값return이 예상될경우 sqlquery단에서 value를int로받아 boolean검증
            if(mapper.checkUniqueEmail(userEmail)==0){
                System.out.println("unique");
                entity = new ResponseEntity<String>("unique",HttpStatus.OK);
                //401
            }else{
                System.out.println("duplicated");
                return entity = new ResponseEntity<String>("duplicat-ed",HttpStatus.UNAUTHORIZED);
            }
        }
        catch (NullPointerException npe) {
            npe.printStackTrace();
            entity = new ResponseEntity<String>("nullpointerException",HttpStatus.BAD_REQUEST);
            
        } catch(Exception e){
            e.printStackTrace();
            entity = new ResponseEntity<>("Exception",HttpStatus.BAD_REQUEST);
        }        
        return entity;
        
    }

    @RequestMapping(value="/SessionConfirm",method = RequestMethod.POST)
    public ResponseEntity<?> SessionConfirm(HttpServletRequest request)throws Exception{

        final String requestTokenHeader = request.getHeader("Authorization");

        String username = null;
        String jwtToken = null;

        if(requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")){

            jwtToken = requestTokenHeader.substring(7);
            try{
                username = jwtTokenUtil.getUsernameFromToken(jwtToken);
            } catch (IllegalArgumentException e) {
                System.out.println("Unable to get JWT Token");
            } catch (ExpiredJwtException e) {
                System.out.println("JWT Token has expired");
            }
        }else {
            System.out.println("notstartedwithbearer");
        }

        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null){
            UserDTO userdto = mapper.submitLogin(username);
            if(jwtTokenUtil.validateToken(jwtToken, userdto)){
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = 
                new UsernamePasswordAuthenticationToken(jwtToken, userdto);
            }
        }
        
        return null;
    }



}
