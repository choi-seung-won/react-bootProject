import React, { Component,useState } from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import $, { extend } from 'jquery';
import Swal from 'sweetalert2'


class userBoardCreate extends Component {
    constructor(props){
        super(props);
        
        this.tempArray = [];
        this.state={
                accesscode: props.match.params.accesscode,
                selectedFile: null,
            }
        }

    componentDidMount () {
        if(this.state.accesscode == 'write'){

        }else{
            //this.loadImage()
            //this.editBoard()
        }
    }

    /*
    loadImage = async() =>{
        axios.post('/requestImage',{
            bid : this.state.bid,
        }).then(Response => {
            try{

            }catch(error){
                
            }
        })
    }
    */

    /*
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
    */

    onChange = async(e) => {
        alert('test')
        let tempFile = e.target.files;
        let filesArr = Array.prototype.slice.call(tempFile);
        let reg = /(.*?)\/(jpg|jpeg|png|bmp)$/;
        filesArr.forEach(function(f){
            if(!f.type.match(reg)){
                alert("imageonly");
                document.getElementById("fileupload").value = "";
                return;
            }
            
            console.log('foundfile=' + f.name);
            
            let reader = new FileReader();
            reader.readAsDataURL(f);

            reader.onload = function(e) {
                let img = $('<img src="' + e.target.result + '"name="'+f.name+'" width="50px" height="50px" className="uploadedimg" style="border: 2px double black;" >');
                let imgname = f.name;
                let del = $('<small style="cursor: pointer" style="font-weight: bolder;" >X</small>');
                let spn = $('<span></span>').append(img).append(del); 
                
                $(".uploadedList").append(spn);
                del.click(function(event){
            		var clicked = $(this);
            		clicked.parent().remove()
            		//Array.prototype.filter로 storeimg배열의 값 재구성
                    this.tempArray = this.tempArray.filter(function (el){
            			return el.name != imgname;
            		});
                    
            	  });
            }
        })

    }

    submitClick = async(type,e) => {
        this.title = $('#title').val();
        this.content = $('#content').val();
        
        this.fnValidate = (e) =>{
            /*
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
            */
            
            return true;
        }
        if(this.fnValidate()){

            var jsonstr = $("form[name='frm']").serialize();
            jsonstr = decodeURIComponent(jsonstr);
            var Json_form = JSON.stringify(jsonstr).replace(/\"/gi,'')
            Json_form = "{\"" +Json_form.replace(/\&/g,'\",\"').replace(/=/gi,'\":"')+"\"}";

            alert(jsonstr);
            try{
                const response = await fetch('/board/Register',{
                    method : 'POST',
                    headers : {
                        'Content-Type': 'application/json',
                    },
                    body : Json_form,
                });
                if(response.status == '200'){
                    alert('status200,ok');
                    try{
                        const formData = new FormData();
                        /*
                        tempArray.forEach(file => {
                            formData.append("ArrayofFileName",file);
                        });
                        */
                        axios.post('/img..',{
                            headers : {"Content-Type" : "multipart/form-data"},
                           data : formData 
                        }).then(response => {
                            alert(response.status);
                        })
                    }catch(error){
                        alert('error');
                    }
                }else if(response.status == '401'){
                    alert('401');
                }
            } catch(error) {

                
            }

        }

    };

    render(){
        return(
            <section>
                <article>
                    <div>
                        <h2>등록/수정</h2>
                    </div>
                    <div>
                        <form name="frm" id="frm" action="" onSubmit="" method="post">
                            <input id="username" value={this.state.username} readOnly />
                            <input id="title" name="title" placeholder='title' />
                            <input id="content" name="content" placeholder='content' />
                            <input id='fileupload' name='fileupload[]' type='file' onChange={this.onChange} multiple="multiple" accept=".png, .jpg, .jpeg" />
                            <div className="btn_confirm" >
                                <div className='bt_ty bt_ty2 submit_ty1' onClick={(e)=> this.submitClick('save',e)}>저장</div>
                            </div>
                        </form>
                        <div id="uploadedList" class='uploadedList' />
                    </div>
                </article>
            </section>
        )
    }

}

export default userBoardCreate;