import React from 'react';
import ReactDOM from 'react-dom/client';
import { createContext } from 'react';
import App from './App';
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";

import { useEffect } from 'react';




export const ClientContext = createContext();
const root = ReactDOM.createRoot(document.getElementById('root'));
var testContext =10;
root.render(

  <React.StrictMode>
<App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

