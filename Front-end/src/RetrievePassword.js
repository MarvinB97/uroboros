import Encabezado from './Encabezado';

import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


import { Button } from 'reactstrap';

export default function RetrievePassword(){
    const navigate = useNavigate();
    const volver = ()=>{navigate('/')};

    return (
        <>
        {/* <Encabezado boton={<Button color='primary' onClick={volver} style={{fontSize: '20px', display: 'inline', float: 'right'}}>volver</Button>}/> */}
        <hr/>
        <div style={{width:'80vw',margin:'auto'}}>
          <Panel/>

        </div>
        </>
    );
}


//---------DESCRIPCION--------------
function Panel(){
    const nombreCompania = 'Uroboros';

    return(
        <div><h2>Recuperación de Contraseña.</h2>
        <hr/>
        <h1>Autorización para el Tratamiento de Datos Personales</h1>


        <p style={{textAlign:'justify'}}>
        Por la presente, autorizo a {nombreCompania} a tratar mis datos personales con el fin de gestionar y recuperar mi contraseña de acceso a los servicios proporcionados por la empresa. Entiendo y acepto que el tratamiento de mis datos personales se realizará conforme a lo establecido en la Ley de Protección de Datos Personales y en la Política de Privacidad de {nombreCompania}.
        
        <h4>Datos Personales Recolectados:</h4>
        <ol>
            <li>Nombre completo</li>
            <li>Dirección de correo electrónico</li>
        </ol>
        
        Cualquier otro dato relevante necesario para la verificación de identidad y recuperación de la contraseña.
        
        <h4>Finalidad del Tratamiento:</h4>
        
        Los datos personales recolectados serán utilizados exclusivamente para los siguientes fines:
        
        Verificación de identidad del usuario.
        
        Recuperación y restablecimiento de la contraseña de acceso a los servicios de {nombreCompania}.
        Comunicación con el usuario en relación con la solicitud de recuperación de contraseña.
        
        <h4>Derechos del Titular de los Datos:</h4>
        El titular de los datos personales tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales en cualquier momento. Para ejercer estos derechos, el titular puede ponerse en contacto con {nombreCompania} a través de [detalles de contacto, como dirección de correo electrónico y número de teléfono].
        
        <h4>Seguridad de los Datos:</h4>
        
        {nombreCompania} se compromete a proteger la privacidad y la seguridad de los datos personales del usuario, implementando medidas de seguridad técnicas y organizativas adecuadas para evitar su pérdida, uso indebido o acceso no autorizado.
        
        <h4>Duración del Tratamiento:</h4>
        
        Los datos personales serán tratados y conservados únicamente durante el tiempo necesario para cumplir con la finalidad mencionada anteriormente, y posteriormente serán eliminados o anonimizados según las normativas aplicables.
        
        Al proporcionar mis datos personales y solicitar la recuperación de mi contraseña, confirmo que he leído y comprendido los términos de esta autorización y doy mi consentimiento para el tratamiento de mis datos personales de acuerdo con lo descrito anteriormente.
        
        <h5>Firma del Titular de los Datos:</h5>

        
        </p>
        
        <EmailForm/>

        <Footpage/>
        </div>
    );
}



function EmailForm() {
    const [email, setEmail] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [inputCaptcha, setInputCaptcha] = useState('');
    const [captchaError, setCaptchaError] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('')
  
    useEffect(() => {
      setCaptcha(generateCaptcha());
    }, []);
  
    const handleChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handleCaptchaChange = (event) => {
      setInputCaptcha(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      if (inputCaptcha === captcha) {
        console.log('Correo electrónico capturado:', email);
        setCaptcha(generateCaptcha()); // Generar un nuevo CAPTCHA
        setInputCaptcha('');
        setEmail('');
        setConfirmationMessage('Formulario enviado con éxito. Revisa tu correo.');
        setCaptchaError(false);
      } else {
        setCaptchaError(true);
        setConfirmationMessage('');
      }
    };
  
    return (
        <>
      <form onSubmit={handleSubmit} style={{display:'inline', margin:'auto'}}>
        <label>
          Correo electrónico:
          <input
            type="email"
            value={email}
            onChange={handleChange}
            required
          />
        </label>
        <div style={{ margin: '10px 0', fontSize: '24px', letterSpacing: '3px' }}>
          <strong>{captcha}</strong>
        </div>
        <label>
          Introduzca el CAPTCHA:
          <input
            type="text"
            value={inputCaptcha}
            onChange={handleCaptchaChange}
            required
          />
        </label>
        {captchaError && <p style={{ color: 'red' }}>CAPTCHA incorrecto, por favor inténtelo de nuevo.</p>}
        <button type="submit">Enviar</button>
      </form>
      {confirmationMessage && <p style={{ color: 'green' }}>{confirmationMessage}</p>}
      </>
    );
  }



function generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  }



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
