import Encabezado from "../../Encabezado";

import React from 'react'
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveLine } from '@nivo/line';

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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";


import { useState } from "react";
import axios from "axios";
//import { PieChart, Pie } from "recharts";

function Options(props) {
  const navigate = useNavigate();
  const cerrarSesion = () => {
    sessionStorage.clear();
    navigate("/");
  };
  const acercaInf = () => {
    navigate("/acerca-de-nosotros");
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Dropdown
      isOpen={dropdownOpen}
      toggle={toggle}
      {...props}
      direction="down"
      style={{ display: "inline", float: "right" }}
    >
      <DropdownToggle caret size="lg" color="primary">
        Opciones
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>Perfil</DropdownItem>
        <DropdownItem onClick={acercaInf}>Acerca de nosotros</DropdownItem>
        <DropdownItem onClick={cerrarSesion}>Cerrar sesión</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

const DashboardCapataz = () => {
  const navigate = useNavigate();
  const rol = sessionStorage.getItem("rol");
  const cerrarSesion = () => {
    sessionStorage.clear();
    navigate("/");
  };
  const acercaInf = () => {
    navigate("/acerca-de-nosotros");
  };
  const Perfil = () => {
    navigate("/profile");
    // navigate("/profile");
  };

  const dataBar = [
    { country: 'Enero', value: 130 },
    { country: 'Febrero', value: 165 },
    { country: 'Marzo', value: 142 },
    { country: 'Abril', value: 190 },
    { country: 'Mayo', value: 120 },
  ];
  
  const dataPie = [
    { id: 'Enero', label: 'Enero', value: 130 },
    { id: 'Febrero', label: 'Febrero', value: 165 },
    { id: 'Marzo', label: 'Marzo', value: 142 },
    { id: 'Abril', label: 'Abril', value: 190 },
    { id: 'Mayo', label: 'Mayo', value: 120 },
  ];
  
  const dataLine = [
    {
      id: 'Ventas',
      data: [
        { x: 'Enero', y: 130 },
        { x: 'Febrero', y: 165 },
        { x: 'Marzo', y: 142 },
        { x: 'Abril', y: 190 },
        { x: 'Mayo', y: 120 },
      ],
    },
  ];
  return (
    <>
      {rol != "Capataz" ? rol != "Desarrollador" (
        navigate("/profile")
      ) : (
        <>
          {/* <Encabezado className="Encabezado" boton={<Options />} /> */}
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
          <div className="dashboard" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
  {/* Gráfica de Barras */}
  <div style={{ margin: '20px', flex: '1 0 200px' }}>
    <h2>Gráfico de Barras</h2>
    <div style={{ width: '100%', height: '300px' }}>
      <ResponsiveBar
        data={dataBar}
        keys={['value']}
        indexBy='country'
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: 'nivo' }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Meses',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Avance de Obra',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  </div>
  {/* Gráfica de Pastel */}
  <div style={{ margin: '20px', flex: '1 0 200px' }}>
    <h2>Gráfico de Pastel</h2>
    <div style={{ width: '100%', height: '300px' }}>
      <ResponsivePie
        data={dataPie}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: 'nivo' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextColor="#333333"
        radialLabelsLinkColor={{ from: 'color' }}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  </div>
  {/* Gráfica de Líneas */}
  <div style={{ margin: '20px', flex: '1 0 200px' }}>
    <h2>Gráfico de Líneas</h2>
    <div style={{ width: '100%', height: '300px' }}>
      <ResponsiveLine
        data={dataLine}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Meses',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Avance de Obras',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        colors={{ scheme: 'nivo' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  </div>
</div>
        </>
      )}
    </>
  );
};

export default DashboardCapataz;
