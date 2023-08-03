import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import "./assets/css/main.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Routing from './routes/routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Routing />
);

reportWebVitals();
