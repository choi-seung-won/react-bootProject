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
            VerifySession: '',
        };
    }

    submitClick = (e) => {
        this.email_val = $('#email_val').val();
        this.pwd_val = $('#pwd_val').val();

        if (this.email_val === '' || this.pwd_val === '') {
            alert('이메일과 비밀번호를 확인해주세요.')
        } else {
            axios.post('/loginVerify', {
                Email: this.email_val,
                Password: this.pwd_val
            }).then(response => {
                //alert(JSON.stringify(response));
                if (response.status == "200") {
                    this.sweetalert('로그인되었습니다.', '', 'info', '닫기')
                    //alert('로그인성공');
                    sessionStorage.setItem('username', response.data.username);
                    sessionStorage.setItem('useremail', response.data.useremail);
                    setTimeout(function () {
                        window.location.href = '/';
                    }.bind(this), 500);
                } else if (response.status == "401") {
                    alert("이메일과 비밀번호를 다시 확인해주세요.");
                } else {
                    alert("backendServerError");
                }

            }).catch(error => {
                alert("이메일과 비밀번호를 다시한번 확인해주세요.", error);
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

    render() {
        try {
            this.state.VerifySession = sessionStorage.getItem('username');
        }
        catch {
            this.state.VerifySession = null;
        } finally {
            if (this.state.VerifySession != null) {
                //alert('alreadylogged');
                return <Redirect to="/" />
            }
        }


        return (
            //차후수정-엔터버그

            <span id="root">
                <div className='page-single'>

                <div className="col col-lg-8 mx-auto">

                <div className='card'>

                    <div className="card-body p-6">

                            <div className='card-title'>ItsLoginPage</div>
                            <div className="form-group">
                                <label className='form-label'>Email Address</label>
                                <input className='form-control' type="text" id="email_val" placeholder="@Email.com" />
                            </div>
                            <div className='form-group'>
                                <label className='form-label'>Password</label>
                                <input className='form-control' type="password" id="pwd_val" placeholder="password" />
                            </div>
                            <button className='btn btn-block btn-primary' onClick={this.submitClick}>LoginButton</button>
                            <div className='form-footer' />
                    </div>
                </div>
                </div>

            </div>
            </span>

        )
    }

}

export default LoginPage;