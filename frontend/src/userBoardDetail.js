import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2'
import $ from 'jquery';
import { Form } from 'tabler-react';

const uploadfolername = '\\uploadStorage';
const container ={
    width: "80%"
}
class userBoardDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            before_Boardid: props.match.params.bid,
            author: '',
            title: '',
            content: '',
            ListedComment: <tr>
                <td>
                    There are no comments!
                </td>
            </tr>,
        }
        this.onclickfunction = this.onclickfunction.bind(this);
    }

    componentDidMount() {
        this.callBoardDetail();
        this.callCommentDetail();
    }

    getFileInfo = (props) => {

    }

    callBoardDetail = async () => {
        axios.get('/board/getDetail', {
            params: { bid: this.state.before_Boardid }
        }).then(
            response => {
                try {
                    //alert(JSON.stringify(response));
                    if (response.status == "200") {
                        $('#title').val(response.data.title);
                        $('#content').val(response.data.content);
                        $('#author').val(response.data.reg_User);
                        this.setState({ author: response.data.reg_User });
                        this.setState({ title: response.data.title });
                        this.setState({ content: response.data.content });
                        axios.get('/board/getDetailImg', {
                            params: { bid: this.state.before_Boardid }
                        }).then(
                            response => {
                                try {
                                    //alert(response.data.length)
                                    for (let i = 0; i < response.data.length; i++) {
                                        //alert(response.data[i]);
                                        $('#imglist').append('<img alt="notloaded" src="' + uploadfolername + response.data[i] + '">')
                                        //$('#imglist').append('<p>itstest' + response.data[i] + '</p>')
                                    }
                                } catch (error) {
                                    console.log(error);
                                }
                            }
                        )

                    }
                } catch (error) {
                    alert(error);
                }
            }
        )
    }

    callCommentDetail = async () => {
        axios.get('/board/getCommentDetail', {
            params: { bid: this.state.before_Boardid }
        }).then(
            response => {
                try {
                    //alert(JSON.stringify(response));
                    if (response.status == "200") {
                        this.setState({ ListedComment: this.CDetailLoader(response.data) });
                    }
                    else {
                        alert(response.status);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        )
    }

    CDetailLoader = (body) => {
        let result = []
        let ListedItem = body;
        //alert(ListedItem)
        for (let i = 0; i < ListedItem.length; i++) {
            var data = ListedItem[i];
            result.push(
                <tr>
                    <td style={{width : '10%'}}>
                        {data.username}
                    </td>
                    <td>
                        {data.content}
                    </td>
                </tr>
            )
            return result;
        }
    }

    onclickfunction = async () => {
        let checker = true;
        //tempedit
        if ($('#commentarea').val() === '') {
            alert('emptycomment')
            checker = false;
        }
        else {
            checker = true;
        }
        if (checker) {
            let content_val = $('#commentarea').val();
            try {
                const response = await fetch('/board/postComment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ content: content_val, username: sessionStorage.getItem('username'), bid: this.state.before_Boardid })
                })
                const body = response.status;
                if (body == '200') {
                    Swal.fire({
                        position: 'bottom-end',
                        icon: 'success',
                        title: '등록완료',
                        showConfirmButton: 'false',
                        timer: 1000
                    }
                    )
                } else {
                    Swal.fire({
                        position: 'bottom-end',
                        icon: 'error',
                        title: 'error',
                        showConfirmButton: 'false',
                        timer: 500
                    })
                }
            } catch (error) {
                console.log(error);
            }
        }


    }

    renderSwitch() {

        let username = sessionStorage.getItem('username');
        if (username === null) {
            return <div class="card"><div class="card-header"></div><div class="card-body"><div class="row row"></div><div class="form-group"><textarea class="form-control" rows="5" placeholder='notlogged'></textarea></div><div class="form-footer"><Link to='/login'><button class="btn btn-block btn-primary">코멘트 작성을 위해 로그인이 필요합니다.</button></Link></div></div></div>
        }
        else {
            return <div class="card"><div class="card-header"><h3 class="card-title">My Profile</h3></div><div class="card-body"><div class="row row"><div class="col col-auto"><span class="avatar avatar-xl"></span></div><div class="col"><div class="form-group"><input class="form-control" type="text" placeholder={sessionStorage.getItem("username")} readOnly /></div></div></div><div class="form-group"><textarea id='commentarea' class="form-control" rows="5" placeholder='Comment'></textarea></div><div class="form-footer"><div class="btn btn-block btn-primary" onClick={this.onclickfunction}>등록</div></div></div></div>
        }
    }

    render() {
        return (
            <div className='container' style={container}>
            <section>

                <input type="text" name="title" id="title"></input>
                <input type="text" name="content" id="content"></input>
                <input type="text" name="author" id="author"></input>
                <div><span id="imglist"></span></div>


                <div className='ComponentDemo'>
                    <Form.FieldSet>
                        <Form.Group
                            isRequired label="Author"
                        />
                        <Form.Input name="exampleauth" />
                        <Form.Group
                            isRequired label="content"
                        />
                        <Form.Input name="examplecontent" />
                    </Form.FieldSet>
                </div>
                {this.renderSwitch()}

                <div className='col'>
                    <div className='card'>
                        <table className="table card-table table-vcenter">
                            <thead>
                                <tr>
                                    <td style={{width : '10%'}}>
                                        작성자
                                    </td>
                                    <td>
                                        댓글
                                    </td>
                                </tr>

                            </thead>
                            <tbody>
                                {this.state.ListedComment}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            </div>
        )
    }

}
export default userBoardDetail;