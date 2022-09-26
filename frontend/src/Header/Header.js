import React, {Component} from 'react';
import cookie from 'react-cookies';
import $ from 'jquery';

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