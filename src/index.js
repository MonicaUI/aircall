import React from 'react';
import { BrowserRouter as Router  } from 'react-router-dom';
import ReactDOM from 'react-dom';


import './css/body.css';
import './css/app.css';
import './css/header.css';

import App from './App.jsx';


ReactDOM.render(
  <Router>
  <App />
  </Router>
  , document.getElementById('app'));