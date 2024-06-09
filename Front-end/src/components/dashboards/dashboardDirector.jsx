import Encabezado from "../../Encabezado";

import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Accordion,
} from "reactstrap";
import { useState } from "react";
import axios from "axios";

const DashboardDirector = () => {
  const navigate = useNavigate();
  const rol = sessionStorage.getItem("rol");
  const Volver = () => {
    navigate("/profile");
    // navigate("/profile");
  };

  return (
    <>
      <Encabezado
        boton={
          <Button
            color="primary"
            onClick={Volver}
            style={{ fontSize: "20px", display: "inline", float: "right" }}
          >
            volver
          </Button>
        }
      />
      <div
        style={{
          width: "80vw",
          margin: "auto",
          marginTop: "30px",
          alignSelf: "center",
          textAlign: "center",
        }}
      >
        Bienvenido al dashboard del rol: {rol}
        <p>DIRECTOR ROL</p>
      </div>
      <div className="dashboard">
        <Accordion title="Users" value="1,024" />
        <Accordion title="Sales" value="$23,456" />
        <Accordion title="Performance" value="87%" />
        {/* Aquí puedes agregar más tarjetas o gráficos */}
      </div>
    </>
  );
};

export default DashboardDirector;
