import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from "axios";
import cookie from 'react-cookies';
import Swal from 'sweetalert2';
import $, { extend } from 'jquery';

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            VerifySession : '',
        };
    }

    submitClick = (e) => {
        this.email_val = $('#email_val').val();
        this.pwd_val = $('#pwd_val').val();

        if(this.email_val === '' || this.pwd_val === ''){
            alert('이메일과 비밀번호를 확인해주세요.')
        }else{
        axios.post('/loginVerify',{
            Email : this.email_val,
            Password : this.pwd_val
        }).then(response => {
            //alert(JSON.stringify(response));
            if(response.status == "200"){
                this.sweetalert('로그인되었습니다.','','info','닫기')
                //alert('로그인성공');
                sessionStorage.setItem('username',response.data.username);
                sessionStorage.setItem('useremail',response.data.useremail);
                setTimeout(function() {
                    window.location.href= '/';
                }.bind(this),500);
            }else if(response.status == "401"){
                alert("이메일과 비밀번호를 다시 확인해주세요.");
            }else{
                alert("backendServerError");
            }

        }).catch(error => {
            alert("이메일과 비밀번호를 다시한번 확인해주세요.",error);
        });
        }
    }
    sweetalert = (title, contents, icon, confirmButtonText) => {
        Swal.fire({
            title: title,
            text: contents,
            icon: icon,
            confirmButtonText: confirmButtonText
          })
    }

    render(){
        try{
            this.state.VerifySession = sessionStorage.getItem('username');
            }
            catch{
                this.state.VerifySession = null;
            }finally{
                if(this.state.VerifySession != null){
                    //alert('alreadylogged');
                    return <Redirect to = "/" />
                }
            }


        return(

            <div>
                <h1>ItsLoginPage</h1>
    <input type="text" id="email_val" placeholder="@Email.com" />

    <input type="text" id="pwd_val" placeholder="password" />

            <button onClick={this.submitClick}>LoginButton</button>
            </div>
        )
    }

}

export default LoginPage;