import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import cookie from 'react-cookies';
import $ from 'jquery';
import Swal from 'sweetalert2';
import * as tabler from 'tabler-react';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernm: '',
        };
    }



    componentDidMount() {
        var cookie_useremail = cookie.load('useremail')
        var cookie_usernm = cookie.load('username')
        var cookie_password = cookie.load('userpassword')

        if (cookie_useremail != undefined) {

            const expires = new Date()
            expires.setMinutes(expires.getMinutes() + 60)

            cookie.save('useremail', cookie_useremail, { path: '/', expires })
            cookie.save('username', cookie_usernm, { path: '/', expires })
            cookie.save('userpassword', cookie_password, { path: '/', expires })

            $('.menulist').show()
            $('.hd_top').show()
        } else {
            $('.menulist').hide()
            $('.hd_top').hide()
        }
    }
    callSessionInfoApi = (type) => {
        axios.post('/Login?sessionConfirm', {
            token1: cookie.load('useremail')
            , token2: cookie.load('username')
        })
            .then(response => {
                this.setState({ usernm: response.data.token2 })
            })
            .catch(error => {
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
        cookie.remove('useremail', { path: '/' });
        cookie.remove('username', { path: '/' });
        cookie.remove('userpassword', { path: '/' });
        window.location.href = '/login';
    }






    render() {
        return (
            <header>
             <div class="header py-4"><div class="container"><div class="d-flex"><a class="header-brand" href="/"></a><div class="d-flex order-lg-2 ml-auto"><div class="nav-item"><a class="nav-link d-none d-md-flex"></a></div><div className='dropdown d-flex'></div>

                <tabler.AccountDropdown
                        avatarURL="./demo/faces/female/25.jpg"
                        name="Jane Pearson"
                        description="Administrator"
                        options={[
                            { icon: "profile", value: "profic", to: "/profc" },
                            { icon: "settings", value: "Settings", to: "/settings" },
                            "divider",
                            "help",
                            "logout",
                        ]}
                    />
                </div><a class="header-toggler d-lg-none ml-3 ml-lg-0"><span class="header-toggler-icon"></span></a></div></div></div>
                <div className='header d-lg-flex p-0'>
                    <div className='container'>
                        <div className='row row align-items-center'>
                            <div className='col-lg-3 ml-auto'></div>
                            <div className='col col-lg order-lg-first'>
                                <ul class="nav nav-tabs border-0 flex-column flex-lg-row"><li class="nav-item"><a aria-current="page" class="nav-link active active" history="[object Object]" match="[object Object]" href="/"><i class="fe fe-home"></i> Home</a></li><li class="nav-item"><a class="nav-link"><i class="fe fe-box" ></i><Link to={'/Create'}> Create</Link></a></li><li class="nav-item"><a class="nav-link"><i class="fe fe-calendar"></i> <Link to={'/ListAll'} >ListAll</Link></a></li><li class="nav-item"><a class="nav-link"><i class="fe fe-file"></i> Pages</a></li><li class="nav-item"><a class="nav-link" history="[object Object]" match="[object Object]" href="/form-elements"><i class="fe fe-check-square"></i> Forms</a></li><li class="nav-item"><a class="nav-link" history="[object Object]" match="[object Object]" href="/gallery"><i class="fe fe-image"></i> Gallery</a></li><li class="nav-item"><a class="nav-link" href="/"><i class="fe fe-file-text"></i> Documentation</a></li></ul>
                            </div>
                        </div>

                    </div>

                </div>

            </header>
        )
    }

}

export default Header;