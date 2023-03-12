
import React from 'react';
import {
  BrowserRouter as
  Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './Container/Home/home';
import { Admin } from './Container/Admin/admin';
function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route
            path='spinnerWheelVolunteer'
            element={<Home/>}
          />
           <Route
            path='admin'
            element={<Admin/>}
          />
          {/* </Route> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
