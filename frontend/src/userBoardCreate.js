import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import $, { extend } from 'jquery';
import Swal from 'sweetalert2'
import { Container } from 'tabler-react';

//if you use react class as component you can't use variables inside ,because classes are objects
//If you have class based component, then you can define the variable outside the class (before the class definition).


let Imgstore = [];
let formData = new FormData();

class userBoardCreate extends Component {
    constructor(props) {
        super(props);

        this.tempArray = [];
        this.state = {
            accesscode: props.match.params.accesscode,
            selectedFile: null,
        }
    }

    componentDidMount() {
        if(sessionStorage.getItem('username') == null){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "글 작성을 위해서 로그인하시오",
                showConfirmButton: false,
                timer: 1000
            });
            this.props.history.push('/login');
        }
        if (this.state.accesscode == 'write') {

        } else {
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

    onChange = async (e) => {
        let tempFile = e.target.files;
        let filesArr = Array.prototype.slice.call(tempFile);
        let reg = /(.*?)\/(jpg|jpeg|png|bmp)$/;
        filesArr.forEach(function (f) {
            if (!f.type.match(reg)) {
                alert("imageonly");
                document.getElementById("fileupload").value = "";
                return;
            }
            Imgstore.push(f);
            //alert(Imgstore.length);
            console.log('foundfile=' + f.name);

            let reader = new FileReader();
            reader.readAsDataURL(f);

            reader.onload = function (e) {
                let img = $('<img src="' + e.target.result + '"name="' + f.name + '" width="50px" height="50px" className="uploadedimg" style="border: 2px double black;" >');
                let imgname = f.name;
                let del = $('<small style="cursor: pointer" style="font-weight: bolder;" >X</small>');
                let spn = $('<span></span>').append(img).append(del);

                $(".uploadedList").append(spn);
                del.click(function (event) {
                    var clicked = $(this);
                    clicked.parent().remove()
                    //Array.prototype.filter로 storeimg배열의 값 재구성
                    Imgstore = Imgstore.filter(function (el) {
                        return el.name != imgname;
                    });

                });
            }
        })

    }

    submitClick = async (type, e) => {
        this.title_checker = $('#title').val();
        this.content_checker = $('#content').val();

        this.fnValidate = (e) => {
            if (this.title_checker === '') {
                $('#title').addClass('border_validate.err');
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: "제목을 입력해주세요",
                    showConfirmButton: false,
                    timer: 1000
                });
                return false;
            }
            $('#title').removeClass('border_validate_err');

            if (this.content_checker === '') {
                $('#content').addClass('border_validate_err');
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: "내용을 입력해주세요.",
                    showConfirmButton: false,
                    timer: 1000
                });
                return false;
            }
            $('#content').removeClass('border_validate_err');

            return true;
        }
        if (this.fnValidate()) {

            var jsonstr = $("form[name='frm']").serialize();
            jsonstr = decodeURIComponent(jsonstr);
            var Json_form = JSON.stringify(jsonstr).replace(/\"/gi, '')
            Json_form = "{\"" + Json_form.replace(/\&/g, '\",\"').replace(/=/gi, '\":"') + "\"}";
            //alert(jsonstr);

            let title = $('#title').val()
            let content = $('#content').val()
            var author = sessionStorage.getItem('username');
            //let선언시에러-state로변경(추후)
            //alert(JSON.stringify({title : title , content : content, reg_User : author}));
            try {
                const response = await fetch('/board/Register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({title : title , content : content, reg_User : author})
                    //Json_form,
                });
                if (response.status == '200') {
                    if (Imgstore.length >= 1) {
                        try {
                            for (let i = 0; i < Imgstore.length; i++) {
                                console.log('foundfile' + i + '=' + Imgstore[i].name);
                                formData.append("fileupload[]", Imgstore[i]);
                                console.log(formData.length);
                            }
                            //axios.post양식문제있음
                            axios.post('/board/ImagePost', formData, {
                                headers: { 'content-type': 'multipart/form-data' },
                            }).then(response => {
                                //alert(response);
                                if (response.status == '201') {
                                    Imgstore = [];
                                    formData = new FormData();
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: "등록성공",
                                        showConfirmButton: false,
                                        timer: 1000
                                    });
                                    setTimeout(function () {
                                        this.props.history.push('/ListAll');
                                    }.bind(this), 1000
                                    )
                                }
                            })
                        } catch (error) {
                            alert(error);
                        }
                    } else{
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: "등록성공",
                            showConfirmButton: false,
                            timer: 1000
                        });
                        setTimeout(function () {
                            this.props.history.push('/ListAll');
                        }.bind(this), 1000
                        )
                    }
                }else if (response.status == '401') {
                    alert('401');
                }
            } catch (error) {
                alert(error);
            }

        }

    };

    render() {
        return (
            <section style={{marginTop: '2.5%'}}>
                <Container fluid className="p-0">
                    <article>
                        <div class="card" style={{minHeight : '500px'}}><div class="card-header"><h3 class="card-title">새 글 작성</h3></div><div class="card-body"><div class="row row"><div class="col">
                            <div class="form-group">
                        <input class="form-control" type="text" placeholder='title' id = "title" /></div></div></div>
                        <div class="form-group"><textarea id='content' class="form-control" rows="20" placeholder='Comment'></textarea></div>
                        {/* <button style={{textalign : 'center', position:'center'}} className='btn btn-outline-primary' id='fileupload' name='fileupload[]' type='file' onChange={this.onChange} multiple="multiple" accept=".png, .jpg, .jpeg" >이미지 업로드</button> */}
                        <input style={{visibility : 'hidden'}} id='fileupload' name='fileupload[]' type='file' onChange={this.onChange} multiple="multiple" accept=".png, .jpg, .jpeg" />
                        <div class="form-footer"> 
                        <label htmlFor = 'fileupload' style={{textalign : 'center', position:'center'}} className='btn btn-outline-primary'>upload Image</label>
                        <div id="uploadedList" class='uploadedList' />
                        <div className="btn btn-primary" style={{ textalign: 'center', position: 'center', width: '50%', marginTop: '1%' }} onClick={(e) => this.submitClick('save', e)} >저장</div></div></div></div>


                        {/* <div>
                            <form name="frm" id="frm" action="" onSubmit="" method="post">
                                <input id="username" value={this.state.username} readOnly />
                                <input id="title" name="title" placeholder='title' />
                                <input id="content" name="content" placeholder='content' />
                                <input id='fileupload' name='fileupload[]' type='file' onChange={this.onChange} multiple="multiple" accept=".png, .jpg, .jpeg" />
                                <div className="btn_confirm" >
                                </div>
                            </form>
                            <div id="uploadedList" class='uploadedList' />
                            <div className="btn btn-primary" style={{ textalign: 'center', position: 'center', width: '30%', marginTop: '5%' }} onClick={(e) => this.submitClick('save', e)}>저장</div>
                        </div> */}
                    </article>
                </Container>
            </section>
        )
    }

}

export default userBoardCreate;