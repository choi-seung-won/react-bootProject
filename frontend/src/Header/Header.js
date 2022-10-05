import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import cookie from 'react-cookies';
import $ from 'jquery';
import Swal from 'sweetalert2';

class Header extends Component{
    constructor(props){
        super(props);
        this.state= {
            usernm:'',
        };
    }
    componentDidMount(){
        var cookie_userid = cookie.load('userid')
        var cookie_usernm = cookie.load('username')
        var cookie_password = cookie.load('userpassword')
    }

    

    render () {

        return(
            <header>
                

            </header>
        )
    }

}