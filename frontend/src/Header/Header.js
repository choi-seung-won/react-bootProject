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
        var cookie_useremail = cookie.load('useremail')
        var cookie_usernm = cookie.load('username')
        var cookie_password = cookie.load('userpassword')

        if(cookie_useremail != undefined){

            const expires = new Date()
            expires.setMinutes(expires.getMinutes() + 60)

            cookie.save('useremail',cookie_useremail,{path : '/' , expires})
            cookie.save('username',cookie_usernm, { path : '/' , expires })
            cookie.save('userpassword',cookie_password, {path : '/' , expires})

            $('.menulist').show()
            $('.hd_top').show()
        }else{
            $('.menulist').hide()
            $('.hd_top').hide()
        }
    }
        callSessionInfoApi = (type) =>{
            axios.post('/Login?sessionConfirm',{
                token1 : cookie.load('useremail')
                ,token2 : cookie.load('username')
            })
            .then(response => {
                this.setState({usernm : response.data.token2})
            }) 
            .catch( error => {
                this.sweetalert()
            });
        }
        sweetalert = (title, contents, icon, confirmButtonText) => {
            Swal.fire({
                title: title,
                text: contents,
                icon: icon,
                confirmButtonText: confirmButtonText
              })
        }

        logout = async e => {
            cookie.remove('useremail',{path: '/'});
            cookie.remove('username',{path : '/'});
            cookie.remove('userpassword', { path: '/'});
            window.location.href = '/login';
        }


    

    

    render () {

        return(
            <header>
                

            </header>
        )
    }

}

export default Header;