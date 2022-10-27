import logo from './logo.svg';
import './App.css';

// css
import './css/new.css';
import './dist/Tabler.css';



import React,{Component} from 'react';
import {Route} from "react-router-dom";
import cookie from 'react-cookies';
import axios from "axios";

import HeaderAdmin from './Header/Header.js'
import Footer from './Footer/Footer.js';

//TestPage
import TestPage from './TestPage';
//LoginPage
import LoginPage from './LoginPage';
//RegisterPage
import RegisterPage from './RegisterPage';
//userBoardCreatePage
import userCreatePage from './userBoardCreate';
//userBoardList
import userBoardList from './userBoardList';
//userBoardDetail
import userBoardDetail from './userBoardDetail';

//mainPage
import mainPage from './MainPage';
import Sidebar from './SideBar/SideBar.js';

class App extends Component {
constructor(props){
  super(props);
  this.state={
    
   }
}



componentDidMount() {
  /*
  axios.post('/SessionConfirm',{
    token1 : cookie.load('useremail')
    , token2 : cookie.load('username')
  }).then(response =>{
    this.state.useremail = response.data.token1
    let Is_password = cookie.load('userpassword')
    if(Is_password !== undefined){
      axios.post('/loginVerify',{
        Email : this.state.useremail,
        password : Is_password
      }).then(response =>{
        alert(response.status);
        if(response.data.json[0].useremail === undefined){
          this.state.username = 'notlogged'; 
        }
      }).catch(error =>{
        alert(error)
      });
    }
  })
  */
/*   .catch(response => alert(response)) */
}

render () {
  return (
    <div className="App" style={{ height : "85vh"}}>
      <div style={{height : 'auto', minHeight : '100%' , paddingBottom : '5%'}}>
      <Sidebar />
      <HeaderAdmin />
              <Route exact path='/' component={mainPage} />
              <Route path='/Test' component={TestPage} />
              <Route path='/login' component={LoginPage} />
              <Route path='/Register' component={RegisterPage} />
              <Route path='/Create' component={userCreatePage} />
              <Route path='/ListAll' component={userBoardList} />
              <Route path='/Detail/:bid' component={userBoardDetail} />
      </div>
              <Footer/>
    </div>
  );
}

}
export default App;
