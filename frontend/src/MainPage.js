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
    { url: "/uploadStorage/2022/10/21/s_878f91b5-c4ef-4650-8721-47e9fd20528b_1lilbub-690x690.jpg" }
];
const container = {
    width: "80%"
}
class mainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
    }

    callRandomImage = async e => {

        axios.get('/selectrandomimage')
            .then(response => {
                //console.log(JSON.stringify(response.data));
                //alert(JSON.stringify(response))
                for (let i = 0; i < response.data.length; i++) {
                    var data = '/uploadStorage'
                    data += JSON.stringify(response.data[i]).replace(/^["'](.+(?=["']$))["']$/, '$1');
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
                    <div style={{ marginLeft: '10%' , marginTop : '2.5%', marginBottom : '2.5%'}}>
                        {this.state.imgslider}
                    </div>
                </div>
            </div>
        </div>
    }
}

export default mainPage;