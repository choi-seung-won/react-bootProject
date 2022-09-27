import logo from './logo.svg';
import './App.css';

import React,{Component} from 'react';
import {Route} from "react-router-dom";
import cookie from 'react-cookies';
import axois from "axios";


//TestPage
import TestPage from './TestPage';
//LoginPage
import LoginPage from './LoginPage';


class App extends Component {
constructor(props){
  super(props);
  this.state={
   }
}



componentDidMount() {

}

render () {
  return (
    <div className="App">
              <Route path='/Test' component={TestPage} />
              <Route path='/login' component={LoginPage} />
      <header className="App-header">
        
        
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
      </header>
    </div>
  );
}

}
export default App;
