import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Login from "./Login.js";
import Profile from "./Profile.js";
import Actualizar from "./Actualizar.js";
import ActualizarUsuarioEspecifico from "./ActualizarUsuarioEspecifico.js";
import AcercaDeNosotros from "./AcercaDeNosotros.js";
import Signin from "./Signin.js";
import Graficos from './Graficos';

const App = () => {
  const token = sessionStorage.getItem("token");
  const autenticado = !!token;
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Navigate to={autenticado ? '/profile' : '/login'} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<ProteccionDeRuta><Profile /></ProteccionDeRuta>} />
            <Route path="/signin" element={<ProteccionDeRuta><Signin /></ProteccionDeRuta>} />
            <Route path="/actualizar" element={<ProteccionDeRuta><Actualizar /></ProteccionDeRuta>} />
            <Route path="/actualizar_usuario_especifico/:id" element={<ProteccionDeRuta><ActualizarUsuarioEspecifico /></ProteccionDeRuta>} />
            <Route path="/acerca-de-nosotros" element={<ProteccionDeRuta><AcercaDeNosotros /></ProteccionDeRuta>} />
            <Route path="/graficos" element={<ProteccionDeRuta><Graficos /></ProteccionDeRuta>} />
          </Routes>
      </Router>
    </div>
  );
};

const ProteccionDeRuta = ({ children }) => {
  const token = sessionStorage.getItem("token");
  const autenticado = !!token;

  return autenticado ? children : <Navigate to="/login" />;
};

export default App;
