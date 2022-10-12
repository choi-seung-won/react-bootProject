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
  axios.post('/SessionConfirm',{
    token1 : cookie.load('useremail')
    , token2 : cookie.load('username')
  }).then(response =>{
    this.state.useremail = response.data.token1
    let password = cookie.load('userpassword')
    if(password !== undefined){
      axios.post('/loginVerify',{
        Email : this.state.useremail,
        password : password
      }).then(response =>{
        if(response.data.json[0].useremail === undefined){
          this.state.username = 'notlogged'; 
        }
      }).catch(error =>{
        alert(error)
      });
    }
  })
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
        
        
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

    </div>
  );
}

}
export default App;
