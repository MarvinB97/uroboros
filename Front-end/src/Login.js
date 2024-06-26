/*
 ***File: Login.js
 ***Last Edition: 14-04-24
 */

//--------------librerias-----------------------
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usuariosList } from "./UsuariosLista.js"; // Importa el archivo de datos
import axios from "axios";
import LoginColumnOne from "./LoginColumnOne.js";
import LoginColumnTwo from "./LoginColumnTwo.js";
import MyForm from "./components/reCaptcha.jsx";
import ReCAPTCHA from "react-google-recaptcha";
import "./css/Login.css";
export let usu = ""; //variable que guarda el username del usuario que ingresa

//--------------funcion principal-----------------------
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

/*
 *------------------COLUMNA TRES-----------------
 */
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
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [webResponse, setWebResponse] = useState(null);

  // const crearCuenta = ()=>{navigate('/signin')};

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
    // // console.log("Datos a enviar:", data);

    if (username === "" || password === "") {
      setError("Por favor, rellena todos los campos");
      return;
    } else {
      axios
        .post(url, data)
        .then((response) => {
          // console.log("Respuesta del servidor:", response);
          // setWebResponse(response);
          if (
            response.request.status === 200 &&
            response.request.statusText === "OK"
          ) {
            // Usuario autenticado, puedes redirigirlo a otra página o mostrar un mensaje de éxito
            // // // console.log("Usuario autenticado:", response.data.user.username);
            let id = response.data.user.id;
            const url_extra = "http://localhost:8000/extra_info/" + id;
            axios
              .post(url_extra, response.data.user)
              .then((extra_response) => {
                // console.log("Respuesta del servidor:", extra_response);

                sessionStorage.setItem(
                  "selectGender",
                  extra_response.data.user_extra[0].genero
                );
                sessionStorage.setItem(
                  "selectId",
                  extra_response.data.user_extra[0].tipo_identificacion
                );
                sessionStorage.setItem(
                  "address",
                  extra_response.data.user_extra[0].direccion
                );
                sessionStorage.setItem(
                  "tel",
                  extra_response.data.user_extra[0].telefono
                );
                sessionStorage.setItem(
                  "email",
                  extra_response.data.user_extra[0].email
                );
                sessionStorage.setItem(
                  "check",
                  extra_response.data.user_extra[0].check
                );
                sessionStorage.setItem(
                  "gender",
                  extra_response.data.user_extra[0].genero
                );
                sessionStorage.setItem(
                  "rol",
                  extra_response.data.user_extra[0].cargo
                );
                sessionStorage.setItem(
                  "document",
                  extra_response.data.user_extra[0].identificacion
                );
                let rol = sessionStorage.getItem("rol");
                setTimeout(() => {
                  if (rol === "Gerente") {
                    navigate("/dashboard_gerente");
                  } else if (rol === "Capataz") {
                    navigate("/dashboard_capataz");
                  } else if (rol === "Director") {
                    navigate("/dashboard_director");
                  } else {
                    navigate("/profile");
                  }
                }, 100);
                // sessionStorage.setItem("foto", response.data.user.foto);
                // // console.log("Usuario autenticado:", response.data.user.username);
              })
              .catch((error) => {
                // console.log("Error al iniciar sesión:", error);
                // setWebError(error);
                setError("Datos de Persona Extra no cargados");
              });

            // Redirige a la pantalla de bienvenida después del inicio de sesión
            setError("");
            sessionStorage.setItem("id", response.data.user.id);
            sessionStorage.setItem("username", response.data.user.username);
            sessionStorage.setItem("first_name", response.data.user.first_name);
            sessionStorage.setItem("last_name", response.data.user.last_name);
            sessionStorage.setItem("email", response.data.user.email);
            document.cookie = `token=${response.data.token}; path=/;`;
            sessionStorage.setItem("token", response.data.token);
          }
        })
        .catch((error) => {
          // console.log("Error al iniciar sesión:", error);
          // setWebError(error);
          setError("Nombre de usuario o contraseña incorrectos");
        });
    }

    // Con ésto, se realiza la redireccón dependiendo de la respuesta por parte del servidor
    // Atte: @iMrStevenS2
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event);

    if (!recaptchaValue) {
      alert("Por favor, completa el reCAPTCHA");
      return;
    } else {
      if (webResponse !== true) {
        alert("Por favor, completa el reCAPTCHA");
        return;
      } else {
        alert("Captcha enviado con éxito");
        document.getElementById("login_button").disabled = false;
      }
    }
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
        <button id="login_button" type="submit" disabled>
          Iniciar sesión
        </button>
        <div style={{ alignContent: "center" }}>{/* <MyForm /> */}</div>
      </form>
      {/* <MyForm /> */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <ReCAPTCHA
            sitekey="6LcvovYpAAAAAGXuklCSyuhE1_CAmvNLUSd6pm1a"
            onChange={(value) => (
              setRecaptchaValue(value), setWebResponse(true)
            )}
          />
        </div>
        <button type="submit">Verificar</button>
      </form>
      <p>
        <a href="./recuperar-contrasena">¿Has olvidado tu contraseña?</a>
      </p>
      {/* <button onClick={crearCuenta}>Crear Cuenta</button> */}
      {error && <p>{error}</p>}
    </div>
  );
};

/*
 *------------------FOOTPAGE-----------------
 */
function Footpage() {
  return (
    <div className="footpage">
      <p>Costructora Uroboros</p>
      <p>Copyright 2024 </p>
    </div>
  );
}
