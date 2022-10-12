import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import cookie from 'react-cookies';
import Swal from 'sweetalert2';
import $ from 'jquery';

class TestPage extends Component {



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
                alert(JSON.stringify(response));

                if (response.status == "200") {
                    alert(response.data.username);
                } else {
                    alert("error");
                }

            }).catch(error => {
                alert("errorwhileprocessing", error);
            });
        }
    }


    TestScript = (e) => {
        axios.post('/TestingCode', {
            Email: "user2@naver.com"
        }).then(response => {
            alert(JSON.stringify(response));
            if (response.status == "200") {
                alert(response.data.username);
            } else {
                alert("error");
            }
        }).catch(error => {
            alert("errorwhileprocess", error);
        });
    }

    TestScript2 = (e) => {
        this.email_val = $('#email_val').val;
        this.pwd_val = $('#pwd_val').val;

        axios.post('/RequestTest', {

            Email: this.email_val,
            Password: this.pwd_val
        }).then(response => {
            alert(JSON.stringify(response));
            if (response.status == "200") {
                alert("success");
            } else {
                alert("failed");
            }
        }).catch(error => {
            alert("errorwhileprocess", error);
        });
    }

    render() {
        return (
            <div className='card'>
                <div className='card-header'>
                    <h3 className='card-title'>sampletitle</h3>
                </div>
                <table class="table card-table table-vcenter text-nowrap"
                >
                    <thead>
                        <tr>
                            <th className="w-1">no.</th>
                            <th>invoicesubject</th>
                            <th>client</th>
                            <th>vatNO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='text-muted'>00413</td>
                        <td class>
                            <a href='google.com' className='text-inherit'>desgwork</a>
                        </td>
                        <td>
                            cson
                        </td>
                        <td>
                            15dec201656
                        </td>
                        </tr>
                        
                    </tbody>

                </table>
                <input type="text" id="email_val" placeholder="@Email.com" />

                <input type="text" id="pwd_val" placeholder="password" />
                <button onClick={this.TestScript}>TESTBUTTON</button>
                <button onClick={this.submitClick}>LoginButton</button>
                <button onClick={this.TestScript2}>TEST2BUTTON</button>
            </div>

        );
    }

}

export default TestPage;