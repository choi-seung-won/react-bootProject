import React, { Component } from 'react';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';
import BootstrapTable from "react-bootstrap-table-next";
import Pagination from "react-bootstrap-table2-paginator"
import styled from 'styled-components';
import Table from 'react-bootstrap/table';


class userBoardList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            responseBoardList: '',
            appendBoardList: '',
        }
    }

    componentDidMount() {
        this.callBoardList()
    }

    callBoardList = async () => {
        axios.get('/board/getList').then(response => {
            //alert(JSON.stringify(response.data));
            alert(JSON.stringify(response));
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
            <div className='container' style={{
                width: "80%",
                height: "70%",
                margin: "5%"
            }}>
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
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>글 제목</th>
                                    <th style={{ width: '10%' }}>작성자</th>
                                    <th style={{ width: '10%' }}>조회수</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.appendBoardList}
                            </tbody>
                        </Table>

                    </article>
                </section>
            </div>
        );
    }

}
export default userBoardList;