import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import jwtDecode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
console.log("qw")
const token = localStorage.getItem('auth_token')

if (token) {
    let decode = jwtDecode(token)
    setAuthToken(token)
}
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
