
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { TopNav } from './Component/TopNav/topNav';
import { SpinnerPage } from './Container/SpinnerPage/spinnerPage';
import { Customizations } from './Container/SpinnerCusomizations/customizations';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './Container/Home/home';

function App() {
  return (
    <div className="App">
      <Home/>    
    </div>
  );
}

export default App;
