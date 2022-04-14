import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/components/App';
import "bulma/css/bulma.css";
import axios from "axios";
axios.defaults.withCredentials = '';
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
