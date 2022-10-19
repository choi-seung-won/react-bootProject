import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2'
import $ from 'jquery';

class userBoardDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            before_Boardid : props.match.params.bid,
        }
    }

    componentDidMount(){
        this.callBoardDetail()
    }

    callBoardDetail = async () =>{
        axios.get('/board/getDetail',{
            params: {bid : this.state.before_Boardid}
        }).then(
            response => {
                try{
                    alert(JSON.stringify(response));
                    if(response.status =="200"){
                        $('#title').val(response.data.title);
                        $('#content').val(response.data.content);
                    }
                }catch(error){
                    alert(error); 
                }
            }
        )
    }

    render() {
        return (
            <section>

                <h2>HELLOO</h2>
                <input type="text" name="title" id="title"></input>
                <input type="text" name="content" id="content"></input>
            </section>
        )
    }

}
export default userBoardDetail;