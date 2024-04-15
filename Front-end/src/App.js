import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; //permite el cambio de pantalla en el inicio de sesión
import './App.css';

import Login from './Login.js';
import Profile from './Profile.js';
import Actualizar from './Actualizar.js';
import AcercaDeNosotros from './AcercaDeNosotros.js';
import Signin from './Signin.js';


const App = () => {
  return (
    <div className='App'>
        <Router>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/actualizar" element={<Actualizar/>}/>
            <Route path="/acerca-de-nosotros" element={<AcercaDeNosotros/>}/>
          </Routes>
        </Router>
    </div>
  );
};

export default App;

