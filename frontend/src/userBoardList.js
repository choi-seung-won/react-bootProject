import React, { Component } from 'react';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';
import BootstrapTable from "react-bootstrap-table-next";
import Pagination from "react-bootstrap-table2-paginator"
import styled from 'styled-components';
import Table from 'react-bootstrap/table';

const container = {
    width: "80%"
}

class userBoardList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            responseBoardList: '',
            appendBoardList: '',
            searchStatus: '',
            value : '',
            beforeBoardStatus: '',
        }
        //this.onSearch = this.onSearch.bind(this);
    }

    componentDidMount() {
        this.callBoardList()
    }

    onSearchChange = async (e) => {
        e.preventDefault();
        this.setState({searchStatus : e.target.value});
        let search = this.state.searchStatus;
        try{
            if(search === ''){
                this.callBoardList()
            }
            axios.get('/board/searchBoard',{
                params : { keyword: this.state.searchStatus}
            }).then(response => {
 //               this.state({searchStatus})
                console.log(response);
                this.setState({appendBoardList : this.BoardListAppend(response)});
            })
        }catch(error){
            console.log(error);
        }
    }

    /* onSearch = async (e) => {
        e.preventDefault();
        let search = this.state.searchStatus;
        alert('okas')
        try{
            axios.get('/board/searchBoard',{
                params : { keyword: this.state.searchStatus}
            }).then(response => {
 //               this.state({searchStatus})
                console.log(response);
                this.setState({appendBoardList : this.BoardListAppend(response)});
            })
        }catch(error){
            console.log(error);
        }
    } */

    callBoardList = async () => {
        axios.get('/board/getList').then(response => {
            //alert(JSON.stringify(response.data));
            //alert(JSON.stringify(response));
            try {
                this.setState({ responseBoardList: response });
                this.setState({ appendBoardList: this.BoardListAppend(response) });
            } catch (error) {
                alert(error);
                this.sweetalert('작업중 오류가 발생하였습니다-1catch.', '', 'error', '닫기');
            }
        }).catch(error => {
            this.sweetalert.bind('작업중 오류가 발생하였습니다.', '', 'error', '닫기'); return false;
        });
    }

    BoardListAppend = (response) => {
        //alert(JSON.stringify(response))
        let result = []
        var BoardList = response.data;
        //alert(BoardList.length)
        if (BoardList && BoardList.length > 0) {
            for (let i = 0; i < BoardList.length; i++) {
                var data = BoardList[i];
                /* 
                                var date = data.reg_date
                                var year = date.substr(0, 4)
                                var month = date.substr(4, 2)
                                var day = date.substr(6, 2)
                                var reg_date = year + '.' + month + '.' + day */
                result.push(
                    <tr>
                        <td>
                            {data.bid}
                        </td>
                        <td>
                            <Link to={'Detail/' + data.bid} style={{ display: 'inline-block' }}>
                                {data.title}
                            </Link>
                        </td>
                        <td>{data.reg_User}</td>
                        <td>{data.viewcount}</td>
                    </tr>
                )
            }
        }
        return result
    }

    deleteBoard = (e) => {
        var event_target = e.target
        this.sweetalertDelete('정말 삭제하시겠읍니까?', function () {
            axios.post('/BoardDelete', {
                is_bid: event_target.getAttribute('bid')
            })
                .then(response => {
                    this.callBoardList()
                }).catch(error => { alert(error); return false; });

        }.bind(this))
    }


    sweetalert = (title, contents, icon, confirmButtonText) => {
        Swal.fire({
            title: title,
            text: contents,
            icon: icon,
            confirmButtonText: confirmButtonText
        })
    }
    sweetalertDelete = (title, callbackFunc) => {
        Swal.fire({
            title: title,
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    'Deleted!',
                    '삭제되었습니다.',
                    'success'
                )
            } else {
                return false;
            }
            callbackFunc()
        })
    }


    render() {
        return (
            <div className='container' style={container}>
                <section>
                    {/* <article className="s_cnt mp_pro_li ct1 mp_pro_li_admin">
                    <div className="li_top">
                    <h2 className="s_tit1"> list of b</h2>
                    <div className="li_top_sch af">
                    <Link to={'/Create'} className="sch_bt2 wi_au">register</Link>
                    </div>
                    <table className="table_ty2 ad_tlist">
                    <thead>
                    <tbody>
                    {this.state.appendBoardList}
                    </tbody>
                    </thead>
                    </table>
                    </div>
                </article> */}
                    <article>
                        <div style={{ backgroundColor: '#fff' }} >
                            <div className='ComponentDemo' style={{position : 'relative', marginBottom : '10px'}}>
                                <div className='example' style={{padding:'1.5rem',border : '1px solid', borderRadius : '3px 1.5px',fontSize : '0.9rem'}}>
                                <div className='input-group' style={{position : 'relative' , display : 'flex' , flexWrap : 'wrap' , alignItems : 'stretch', width : '100%'}}>

                                <select className='form-control custom-select' style={{height : '2.375rem' , borderTopRightRadius : '0' , borderBottomRightRadius : '0', position : 'relative' , flex : '1 1 auto' , width : '1%' , marginBottom : '0', backgroundSize : '8px 10px', verticalAlign : 'middle', color : '#495057' }}>
                                    <option value='0'>제목/내용</option>
                                    <option value='1'>제목</option>
                                    <option value='2'>내용</option>
                                </select>
                                <input className='form-control' style={{position: 'relative', padding : '0.375rem 0.75rem', lineHeight : '1.6' , backgroundClip : 'padding-box', border : '1px solid'}} id="searchbar" type="text" value={this.state.searchStatus} onChange = {this.onSearchChange} />
                                </div>
                                </div>
                                {/* <button type="button" onClick={(e) => this.onSearch(e)} >search</button> */}
                            </div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th style={{ width: '10%'}}>글 번호</th>
                                        <th>글 제목</th>
                                        <th style={{ width: '10%' }}>작성자</th>
                                        <th style={{ width: '10%' }}>조회수</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.appendBoardList}
                                </tbody>
                            </Table>
                        </div>
                    </article>
                </section>
            </div>
        );
    }

}

export default userBoardList;