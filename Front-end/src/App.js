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
import CrearTareas from './CrearTareas.js';

import CrearObra from './CrearObra.js';
import ActualizarObras from './ActualizarObras.js';
import Gerente from './Gerente.js';
import RetrievePassword from './RetrievePassword.js'
import CrearAvance from './CrearAvance.js';


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
            <Route path="/recuperar-contrasena" element={<ProteccionDeRuta><RetrievePassword/></ProteccionDeRuta>}/>
            <Route path="/actualizar" element={<ProteccionDeRuta><Actualizar /></ProteccionDeRuta>} />
            <Route path="crear_obras" element={<ProteccionDeRuta><CrearObra/></ProteccionDeRuta>}/>
            <Route path="/actualizar_obras/:id" element={<ProteccionDeRuta><ActualizarObras/></ProteccionDeRuta>}/>
            <Route path='/crear_tareas' element={<ProteccionDeRuta><CrearTareas/></ProteccionDeRuta>}/>
            <Route path='/crear_avance' element={<ProteccionDeRuta><CrearAvance/></ProteccionDeRuta>}/>
            <Route path="/gerente" element={<ProteccionDeRuta><Gerente/></ProteccionDeRuta>}/>
            <Route path="/actualizar_usuario_especifico/:id" element={<ProteccionDeRuta><ActualizarUsuarioEspecifico /></ProteccionDeRuta>} />
            <Route path="/acerca-de-nosotros" element={<ProteccionDeRuta><AcercaDeNosotros /></ProteccionDeRuta>} />
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
