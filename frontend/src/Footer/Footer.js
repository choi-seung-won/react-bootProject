import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import cookie from 'react-cookies';
import $ from 'jquery';
import Swal from 'sweetalert2';
import * as tabler from 'tabler-react';

class Footer extends Component{
    constructor(props){
        super(props);
        this.state ={

        };
    }

    render(){

        return <div class="container" style={{background : '#fff', borderTop : '1px solid', fontSize : '0.875rem' , padding : '1.25rem', color : '#9aa0ac' , marginTop : '2.5%'}}>
            <div class="row row align-items-center flex-row-reverse">
                <div class="col col-auto ml-auto">
                    <div class="row row align-items-center">
                        <div class="col col-auto">
                            <ul class="list list-inline list-inline-dots mb-0">
                            <li class="list-inline-item"><a href="./docs/index.html">Documentation</a></li>
                            <li class="list-inline-item"><a href="./faq.html">FAQ</a></li></ul></div><div class="col">
                                </div></div></div><div class="col col-12 col-lg-auto mt-3 mt-lg-0 text-center">Copyright © 2022<a href="#"> </a><a href="" target="_blank" rel="noopener noreferrer"> </a></div></div></div>
                                ;
    }
}

export default Footer;