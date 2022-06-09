import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';
import "bulma/css/bulma.css";
import axios from "axios";
axios.defaults.withCredentials = '';
// For GET requests
axios.interceptors.request.use(
  (req) => {
     // Add configurations here
     return req;
  },
  (err) => {
     return Promise.reject(err);
  }
);

// For POST requests
axios.interceptors.response.use(
  (res) => {
     // Add configurations here
     if (res.status === 201) {
        console.log('Posted Successfully');
     }
     return res;
  },
  (err) => {
     return Promise.reject(err);
  }
);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
