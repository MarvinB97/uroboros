import axios from "axios";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const MyForm = () => {
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!recaptchaValue) {
      alert("Por favor, completa el reCAPTCHA");
      return;
    }

    // Realiza la verificación del reCAPTCHA en el servidor
    // const response = await fetch("http://localhost:8000/verify-recaptcha/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     recaptcha: recaptchaValue,
    //   }),
    // });

    axios
      .post("http://localhost:8000/verify-recaptcha/", {
        body: JSON.stringify({
          recaptcha: recaptchaValue,
        }),
      })
      .then((response) => {
        console.log(response);
        document.getElementById("login_button").disabled = false;
      })
      .catch((error) => {
        console.log(error);
      });

    // const result = await response.json();

    // if (result.success) {
    //   alert("Formulario enviado con éxito");
    // } else {
    //   alert("La verificación del reCAPTCHA falló. Inténtalo de nuevo.");
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Otros campos del formulario */}

      <ReCAPTCHA
        sitekey="6LcvovYpAAAAAGXuklCSyuhE1_CAmvNLUSd6pm1a"
        onChange={(value) => setRecaptchaValue(value)}
      />
      <br />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default MyForm;
