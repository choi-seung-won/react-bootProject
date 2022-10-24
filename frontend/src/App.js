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
    <div className="App">
      <HeaderAdmin />
              <Route path='/Test' component={TestPage} />
              <Route path='/login' component={LoginPage} />
              <Route path='/Register' component={RegisterPage} />
              <Route path='/Create' component={userCreatePage} />
              <Route path='/ListAll' component={userBoardList} />
              <Route path='/Detail/:bid' component={userBoardDetail} />
    </div>
  );
}

}
export default App;
