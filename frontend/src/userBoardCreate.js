import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import $, { extend } from 'jquery';
import Swal from 'sweetalert2'

class userBoardCreate extends Component {
    constructor(props){
        super(props);
            this.state={
                accesscode: props.match.params.accesscode,
                selectedFile: null,
        }
    }

    componentDidMount () {
        if(this.state.accesscode == 'write'){

        }else{
            //this.loadImage()
            this.editBoard()
        }
    }

    loadImage = async() =>{
        axios.post('/requestImage',{
            bid : this.state.bid,
        }).then(Response => {
            try{

            }catch(error){
                
            }
        })
    }

    editBoard = async () => {
        axios.post('/requestBid',{
            bid : this.state.bid,
        })
        .then(Response => {
            try{
                var data = response.data.json[0]
                $('#title').val(data.title)
                $('#content').val(data.content)
                $('#reg_date').val(data.reg_date)
                $('#reg_user').val(data.reg_user)
                $('#update_date').val(data.update_date)

            }catch(error){
                alert('error')
            }
        })
        .catch(error => {alert('errorwhileprocess.');return false;});

    }

    submitClick = async(type,e) => {
        this.title = $('#title').val();
        this.content = $('#content').val();
        
        this.fnValidate = (e) =>{
            if(this.title_checker ===''){
                $('#title').addClass('border_validate.err');
                alert('checktitleplz')
                return false;
            }
            $('#title').removeClass('border_validate_err');

            if(this.content_checker === ''){
                $('#content').addClass('border_validate_err');
                alert('checkcontentplz')
                return false;
            }
            $('#content').removeClass('border_validate_err');
            return true;
        }
        if(this.fnValidate()){

            var jsonstr = $("form[name='frm']").serialize();
            jsonstr = decodeURIComponent(jsonstr);
            var Json_form = JSON.stringify(jsonstr).replace(/\"/gi,'')
            Json_form = "{\"" +Json_form.replace(/\&/g,'\",\"').replace(/=/gi,'\":"')+"\"}";

            try{
                const response = await fetch('/')
            }

        }


    }

    render(){
        return(
            <section>
                <article>
                    <div>
                        <h2>등록/수정</h2>
                    </div>
                    <div>
                        <form name="frm" id="frm" action="" onsubmit="" method="post">
                            <input id="title" type="hidden" name="title" />
                            <input id="username" type="readonly" value={this.state.username} />
                            <input id={this.state.bid} type="hidden" name="bid" />

                            <div class="btn_confirm mt20" style={{"margin-bottom": "44px"}}>
                                <a href="javascript:" onClick={(e)=> this.submitClick('save',e)}>저장</a>
                            </div>
                        </form>

                    </div>
                </article>
            </section>
        )
    }

}