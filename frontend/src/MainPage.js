import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2'
import $, { post } from 'jquery';
import SimpleImageSlider from 'react-simple-image-slider';

const uploadfoldername = '/uploadStorage';
//let imageList = [];
let sample = [
    { url: "/uploadStorage/2022/10/21/8ff99bfc-1508-4d32-8e94-a8f811517c1a_3pudgethecat-690x690.jpg" },
    { url: "/uploadStorage/2022/10/21/878f91b5-c4ef-4650-8721-47e9fd20528b_1lilbub-690x690.jpg" }
];
const container = {
    width: "100%",
    height: "100%"
}
const c3Style = {
    height:'10rem' , position : 'relative'
}
class mainPage extends Component {
    //historyclear
    constructor(props) {
        sample = [{ url: "/uploadStorage/2022/10/21/8ff99bfc-1508-4d32-8e94-a8f811517c1a_3pudgethecat-690x690.jpg" },
        { url: "/uploadStorage/2022/10/21/878f91b5-c4ef-4650-8721-47e9fd20528b_1lilbub-690x690.jpg" }];
        super(props);
        this.state = {
            
            BoardList: '',
            tempstorage: [],
            imgslider: <SimpleImageSlider
                width={900}
                height={378}
                showNavs={true}
                images={sample}
                navStyle={1}
                navMargin={30}
                showBullets={true}
                autoPlay={true}
                autoPlayDelay={1}
            />
        };
    }


    componentDidMount() {
        this.callRandomImage()
        this.callTopTenBoardList()
    }

    callTopTenBoardList = async e => {
        axios.get('/selecttoptenBoard').then(
            response => {
                try {
                    let result = []
                    var BList = response.data;
                    if (BList && BList.length > 0) {
                        for (let i = 0; i < BList.length; i++) {

                            var data = BList[i];
                            console.log(data);
                            let redi = 'Detail/' + data.bid;
                            result.push(
                                <tr>
                                    <td className='w-1'>
                                        {data.reg_User}
                                    </td>
                                    <td>
                                        <Link to = {'Detail/' + data.bid}>
                                        {data.title}
                                        </Link>
                                    </td>
                                    <td>
                                        {data.viewcount}
                                    </td>
                                </tr>
                            )
                        }
                    }
                    this.setState({BoardList : result});
                } catch (error) {
                    console.log(error);
                }
            }
        )
    }

    callRandomImage = async e => {

        axios.get('/selectrandomimage')
            .then(response => {
                //console.log(JSON.stringify(response.data));
                //alert(JSON.stringify(response))
                for (let i = 0; i < response.data.length; i++) {
                    var data = '/uploadStorage'
                    data += JSON.stringify(response.data[i]).replace(/^["'](.+(?=["']$))["']$/, '$1').replace('s_',"");
                    //alert(data);
                    var tempObj = {};
                    tempObj['url'] = data;
                    console.log(tempObj);
                    //imageList.push(tempObj);
                    sample.push(tempObj);
                    //기본이미지 소지한 array 설정후 push
                    //console.log(imageList);
                    //console.log(sample);
                    //imageList.push({url : "/uploadStorage/2022/10/21/8ff99bfc-1508-4d32-8e94-a8f811517c1a_3pudgethecat-690x690.jpg"})
                    //console.log(uploadfoldername + response.data[i].fileName)
                    //console.log(imageList);
                    //$('#imglist').append('<img alt="notloaded" src="' + '\\uploadStorage' + response.data[i] + '">')
                }
                //alert(JSON.stringify(imageList)),
                //alert(JSON.stringify(sample));

            })
        /* .then(
           this.lastcall()
   )  */
    }

    /* lastcall = () =>{

        $('#test').append(<SimpleImageSlider
            width = {896}
            height = {504}
            images = {imageList}
            showBullets = {true}
            showNavs= {true}
            />)
    } */

    render() {
        return <div className='container' style={container}>
            <div className='row row' style={{ marginTop: '5%' }}>
                <div className='col col-lg8 card'>
                    <div style={{ marginLeft: '10%', marginTop: '2.5%', marginBottom: '2.5%' }}>
                        {this.state.imgslider}
                    </div>
                </div>
            </div>
                
                <div className="col col-lg-6" style={{height : '600px'}}>

                <div className='card' style={{height : '600px'}}>

                    <div className='card-header'>
                            <h3 className='card-title'>Highly Spotted</h3>
                    </div>
                    
                    <div className='c3' style={c3Style}>
                        <div className='table-responsive'>
                            <table className='table card-table table-striped table-vcenter'>
                                <thead>
                                    <tr>
                                        <th>
                                            Writer
                                        </th>
                                        <th>
                                            Title
                                        </th>
                                        <th>
                                            ViewCount
                                        </th>
                                    </tr>
                                </thead>
                                
                                {this.state.BoardList}
                                <tbody>
                                    
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
                </div>
        </div>
    }
}

export default mainPage;