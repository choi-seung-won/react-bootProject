import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import cookie from 'react-cookies';
import Swal from 'sweetalert2';
import $ from 'jquery';

class TestPage extends Component{


    TestScript = (e) => {
        axios.post('/TestingCode',{
            Email : "user2@naver.com"
        }).then(response => {
            alert(JSON.stringify(response));
            if(response.status == "200"){
            alert(response.data.username);
            }else{
                alert("error");
            }
        }).catch(error => {
            alert("errorwhileprocess",error);
        });
    }

    render(){
return(
    <div>
        <button onClick={this.TestScript}>TESTBUTTON</button>
    </div>

        );
   }

}

export default TestPage;