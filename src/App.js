import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; //permite el cambio de pantalla en el inicio de sesión
import './App.css';

import Login from './Login.js';
import Profile from './Profile.js';


const App = () => {
  return (
    <div className='App'>
        <Router>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Routes>
        </Router>
    </div>
  );
};

export default App;

