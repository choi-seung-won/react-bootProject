import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2'
import $, { post } from 'jquery';
import { Button, Form } from 'tabler-react';
import Modal from 'react-modal';
import BModal from 'react-bootstrap/Modal';
import BButton from 'react-bootstrap/Button';
import BForm from 'react-bootstrap/Form';
import BCard from 'react-bootstrap/Card';

const uploadfolername = '\\uploadStorage';
const container = {
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
            modalState: false,
            modalCno: '',
            modalContent: '',
        }
        this.onclickfunction = this.onclickfunction.bind(this);
        this.editComment = this.editComment.bind(this);
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

    functionfrag = (e) => {
        this.setState({ modalState: true })
        this.setState({ modalCno: e });
    }

    deletefunction = (e) => {
        let cno = parseInt(e);
        parseInt(cno);
        alert(cno)
        axios.delete('/board/deleteComment', {
            params: { cno: cno }
        }).then(
            this.callCommentDetail
        )
    }

    CDetailLoader = (body) => {
        let result = []
        let ListedItem = body;
        for (let i = 0; i < ListedItem.length; i++) {
            var data = ListedItem[i];
            //alert(JSON.stringify(data));
            if (data.username == sessionStorage.getItem('username')) {
                result.push(
                    <tr>
                        <td style={{ width: '10%' }}>
                            {data.username}
                        </td>
                        <td>
                            {data.content}
                        </td>
                        <td id={data.cno} style={{ width: '5%', textAlign: 'right' }} >
                            <i class="fe fe-navigation" onClick={this.functionfrag.bind(this, data.cno)}
                            >수정</i>
                            <i className="fe fe-x-square" onClick={this.deletefunction.bind(this, data.cno)} >삭제</i>
                        </td>
                    </tr>
                )
            } else {
                result.push(
                    <tr>
                        <td style={{ width: '10%' }}>
                            {data.username}
                        </td>
                        <td>
                            {data.content}
                        </td>
                        <td>
                        </td>
                    </tr>
                )
            }
        }
        return result;
    }

    editComment = () => {
        let content = this.state.modalContent;
        axios({
            method: 'POST',
            url: '/board/editComment',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                content: content,
                cno: this.state.modalCno,
                username: sessionStorage.getItem('username'),
                bid: this.state.before_Boardid
            })
        }).then(response => {
            //alert(JSON.stringify(response))
            if (response.status == "200") {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: '등록완료',
                    showConfirmButton: true,
                    timer: 1000
                })
                this.setState({ modalState: false });
                this.callCommentDetail();
            } else (
                alert('error')
            )
        })
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
                        position: 'center',
                        icon: 'success',
                        title: '등록완료',
                        showConfirmButton: 'false',
                        timer: 1000
                    }
                    )
                    $('#commentarea').val('');
                    this.callCommentDetail();
                } else {
                    Swal.fire({
                        position: 'center',
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
                    <div>
                        <BCard>
                            <BCard.Header as="h5" >{this.state.title} {this.state.author}</BCard.Header>
                            <div><span id="imglist"></span></div>
                            <BCard.Body>
                                <BCard.Text>{this.state.content}</BCard.Text>
                            </BCard.Body>
                        </BCard>
                    </div>
                    <div className='ComponentDemo'>

                        {/* <Form.FieldSet>
                            <Form.Group
                                isRequired label="Author"
                            />
                            <Form.Input name="exampleauth" />
                            <Form.Group
                                isRequired label="content"
                            />
                            <Form.Input name="examplecontent" />
                        </Form.FieldSet> */}
                    </div>
                    {this.renderSwitch()}

                    <div className='col'>
                        <div>
                            {/* <Modal isOpen={this.state.modalState} onRequestClose={() => this.setState({modalState : false})} >
                                asd
                            </Modal> */}
                            <BModal show={this.state.modalState} onHide={false} >
                                <BModal.Header closeButton>
                                    <BModal.Title>{this.state.modalCno}</BModal.Title>
                                    <BModal.Title>title</BModal.Title>
                                </BModal.Header>
                                <BForm>
                                    <BForm.Group className="mb">
                                        <BForm.Label>address</BForm.Label>
                                        <BForm.Control
                                            type='text'
                                            placeholder="okay"
                                            onChange={e => this.setState({ modalContent: e.target.value })}
                                            autoFocus />
                                    </BForm.Group>
                                </BForm>
                                <BModal.Body>
                                    hi
                                </BModal.Body>
                                <BModal.Footer>
                                    <BButton variant="primary" onClick={this.editComment}>save</BButton>
                                    <BButton variant="secondary" onClick={() => this.setState({ modalState: false })}>close</BButton>
                                </BModal.Footer>
                            </BModal>
                        </div>
                        <div className='card'>
                            <table className="table card-table table-vcenter">
                                <thead>
                                    <tr>
                                        <td style={{ width: '10%' }}>
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
//Modal.setAppElement('#root')
export default userBoardDetail;