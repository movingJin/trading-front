import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { compose } from 'redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import preLogin from './utils/preLogin';

// Window 타입에  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 정의해줌
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    google?: any;
  }
}

preLogin();

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
