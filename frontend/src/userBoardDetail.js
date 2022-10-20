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

    getFileInfo = (props) =>{

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

                        axios.get('/board/getDetailImg',{
                            params:{bid: this.state.before_Boardid}
                        }).then(
                            response =>{
                                try{
                                    //alert(response.data.length)
                                    for(let i=0; i < response.data.length; i ++){
                                        alert(response.data[i]);
                                        $('#imglist').append('<img alt="notloaded" src="C:\\uploadfiles\\upload'+ process.env.PUBLIC_URL + response.data[i]+'">')
                                        $('#imglist').append('<p>itstest'+response.data[i]+'</p>')
                                    }
                                }catch{
                                    
                                }
                            }
                        )

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
                <div><span id="imglist"></span></div>
            </section>
        )
    }

}
export default userBoardDetail;