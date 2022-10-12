import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2'

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
            //alert (JSON.stringify(response.data));
            try {
                this.setState({ responseBoardList: response });
                this.setState({ appendBoardList: this.BoardListAppend() })
            } catch (error) {
                alert(error);
                this.sweetalert('작업중 오류가 발생하였습니다-1catch.', '', 'error', '닫기');
            }

        })
            .catch(error => {
                this.sweetalert.bind('작업중 오류가 발생하였습니다.', '', 'error', '닫기'); return false;
            });
    }

    BoardListAppend = () => {

        let result = []
        var BoardList = this.state.responseBoardList.data
        if (BoardList && BoardList.length > 0) {
            alert(JSON.stringify(BoardList.length));
            
            for (let i = 0; i < BoardList.length; i++) {
                var data = BoardList[i];
/* 
                var date = data.reg_date
                var year = date.substr(0, 4)
                var month = date.substr(4, 2)
                var day = date.substr(6, 2)
                var reg_date = year + '.' + month + '.' + day */

                result.push(
                    <tr class="hidden_type">
                        <td>{data.title}
                        </td>
                        <td>
                            <Link to={'/board/getDetail/' + data.bid} className="bt_c1 bt_c2 w50_b">
                                이동
                            </Link>
                            <Link to={'google.com'}>
                                수정
                            </Link>
                            <a href='google.com' class="bt_c1 w50_b" id={data.bid} onClick={(e) => this.deleteBoard(e)}>
                                삭제
                            </a>
                        </td>
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
            <section>
                <article class="s_cnt mp_pro_li ct1 mp_pro_li_admin">
                <div class = "li_top">
                    <h2 class = "s_tit1"> list of b</h2>
                    <div class = "li_top_sch af">
                    <Link to={'/Create'} className="sch_bt2 wi_au">register</Link>
                    </div>
                <table class = "table_ty2 ad_tlist">
                    {this.state.appendBoardList}
                </table>
                </div>
                </article>
            </section>
        );
    }

}
export default userBoardList;