/*
*Pantalla de inicio de sesión
*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {usuariosList} from './UsuariosLista.js'; // Importa el archivo de datos
import axios from 'axios';


import LoginColumnOne from './LoginColumnOne.js';
import LoginColumnTwo from './LoginColumnTwo.js';

export let usu = '';

export default function Login(){
  return (
    <div className='flexbox-container'>
        <div className='column-one'>
          <LoginColumnOne/>
        </div>

        <div className='column-two'>
          <LoginColumnTwo/>
        </div>

        <div className='column-three'>
          <LoginColumnThree/>
        </div>
    </div>
  );
}


function LoginColumnThree(){
  return (
  <div className='content-ColumnThree'>
      <Form/>
      <Footpage/>
  </div>);
}


const Form = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  usu = username;

const handleLogin = (e) => {

// Aquí puedes hacer una petición POST para enviar los datos a un servidor
// axios.post
// axios.post('http://localhost:4000/login', { username, password })
//   .then(response => {
//     console.log('Respuesta del servidor:', response.data);
//   })
//   .catch(error => {
//     console.error('Error al iniciar sesión:', error);
//   });

// Mañana me encargo de hacer el back para que verifique el usuario en el back
// Atte: @iMrStevenS2

  e.preventDefault();
  const user = usuariosList.find(u => u.username === username && u.password === password);
  if (user) {
    // Usuario autenticado, puedes redirigirlo a otra página o mostrar un mensaje de éxito
    console.log('Usuario autenticado:', user);
    setError('');
    // Redirige a la pantalla de bienvenida después del inicio de sesión
    navigate('/profile');
  } else {
    setError('Nombre de usuario o contraseña incorrectos');
  }
};

return (
  <div className='login'>
    <form onSubmit={handleLogin}>
      <input 
        type="text" 
        placeholder="Nombre de usuario" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Contraseña" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button type="submit">Iniciar sesión</button>
    </form>
    <p><a href='...'>¿Has olvidado tu contraseña?</a></p>
    <button>Crear Cuenta</button>
    {error && <p>{error}</p>}
  </div>
);
};












function Footpage() {
  return (
  <div className="footpage">
        <p>Costructora Uroboros</p>
        <p>Copyright 2024 </p>
  </div>
  );
}