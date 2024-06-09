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
import { PieChart, Pie } from "recharts";

const DashboardCapataz = () => {
  const navigate = useNavigate();
  const rol = sessionStorage.getItem("rol");
  const Perfil = () => {
    navigate("/profile");
    // navigate("/profile");
  };

  const data01 = [
    {
      name: "Group A",
      value: 400,
    },
    {
      name: "Group B",
      value: 300,
    },
    {
      name: "Group C",
      value: 300,
    },
    {
      name: "Group D",
      value: 200,
    },
    {
      name: "Group E",
      value: 278,
    },
    {
      name: "Group F",
      value: 189,
    },
  ];
  const data02 = [
    {
      name: "Group A",
      value: 2400,
    },
    {
      name: "Group B",
      value: 4567,
    },
    {
      name: "Group C",
      value: 1398,
    },
    {
      name: "Group D",
      value: 9800,
    },
    {
      name: "Group E",
      value: 3908,
    },
    {
      name: "Group F",
      value: 4800,
    },
  ];
  return (
    <>
      {rol != "Capataz" ? (
        navigate("/profile")
      ) : (
        <>
          <Encabezado
            boton={
              <Button
                color="primary"
                onClick={Perfil}
                style={{ fontSize: "20px", display: "inline", float: "right" }}
              >
                Perfi
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
            <p> CAPATAZ ROL</p>
          </div>
          <div className="dashboard">
            <PieChart width={730} height={250}>
              <Pie
                data={data01}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={50}
                fill="#8884d8"
              />
              <Pie
                data={data02}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#82ca9d"
                label
              />
            </PieChart>
          </div>
        </>
      )}
    </>
  );
};

export default DashboardCapataz;
