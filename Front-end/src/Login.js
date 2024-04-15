/*
 *Pantalla de inicio de sesión
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usuariosList } from "./UsuariosLista.js"; // Importa el archivo de datos
import axios from "axios";

import LoginColumnOne from "./LoginColumnOne.js";
import LoginColumnTwo from "./LoginColumnTwo.js";

export let usu = "";

export default function Login() {
  return (
    <div className="flexbox-container">
      <div className="column-one">
        <LoginColumnOne />
      </div>

      <div className="column-two">
        <LoginColumnTwo />
      </div>

      <div className="column-three">
        <LoginColumnThree />
      </div>
    </div>
  );
}

function LoginColumnThree() {
  return (
    <div className="content-ColumnThree">
      <Form />
      <Footpage />
    </div>
  );
}

const Form = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  usu = username;

  /**
   * Función que se ejecuta al enviar el formulario
   * Se mmodificó la funcion original para que se conecte con la base de datos
   * y verifique si el usuario existe o no
   * @param {event} e Evento del formulario
   * @returns {void}
   * @iMrStevenS2
   */
  const handleLogin = (e) => {
    e.preventDefault();

    const url = "http://localhost:8000/login";
    const data = { username, password };
    // console.log("Datos a enviar:", data);

    if (username === "" || password === "") {
      setError("Por favor, rellena todos los campos");
      return;
    } else {
      axios
        .post(url, data)
        .then((response) => {
          console.log("Respuesta del servidor:", response);
          // setWebResponse(response);
          if (
            response.request.status === 200 &&
            response.request.statusText === "OK"
          ) {
            // Usuario autenticado, puedes redirigirlo a otra página o mostrar un mensaje de éxito
            // // console.log("Usuario autenticado:", response.data.user.username);

            // Redirige a la pantalla de bienvenida después del inicio de sesión
            setError("");
            navigate("/profile");
          }
        })
        .catch((error) => {
          console.log("Error al iniciar sesión:", error);
          // setWebError(error);
          setError("Nombre de usuario o contraseña incorrectos");
        });

    }

    // Con ésto, se realiza la redireccón dependiendo de la respuesta por parte del servidor
    // Atte: @iMrStevenS2
  };

  return (
    <div className="login">
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
      <p>
        <a href="...">¿Has olvidado tu contraseña?</a>
      </p>
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