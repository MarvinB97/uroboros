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
  Card,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie } from "recharts";

import DataTable from "react-data-table-component";

import "../../css/reportes.css";

import AccordionComponent from "./acordeon/CapatazAccordionComponent";
import { CSVLink } from "react-csv";

const columns = [
  {
    name: "Nombre obra",
    selector: (row) => row.descripcion,
  },
  {
    name: "Estado",
    selector: (row) => row.estado,
  },
  {
    name: "Usuarios asignados",
    selector: (row) => row.usuarios_asignados,
  },
  {
    name: "Capataz",
    selector: (row) => row.nombre_capataz,
  },
  {
    name: "Director de Obra",
    selector: (row) => row.nombre_encargado,
  },
  {
    name: "Mes de Inicio",
    selector: (row) => row.mes_inicio,
  },
  {
    name: "Avances",
    selector: (row) => row.avances_obra,
  },
];

var csv_headers = [
  { label: "Nombre obra", key: "descripcion" },
  { label: "Estado", key: "estado" },
  { label: "Usuarios asignados", key: "usuarios_asignados" },
  { label: "Capataz", key: "nombre_capataz" },
  { label: "Director de Obra", key: "nombre_encargado" },
  { label: "Mes de Inicio", key: "mes_inicio" },
  { label: "Avances", key: "avances_obra" },
];

const ReporteCapataz = () => {
  const [state_obra, setState_obra] = useState({ obra: [] });
  const id_user = sessionStorage.getItem("id");

  const navigate = useNavigate();
  const url_obra = "http://localhost:8000/reporte_capataz/" + id_user;
  useEffect(() => {
    axios
      .post(url_obra)
      .then((response) => {
        setState_obra({
          ...state_obra,
          obra: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h3 style={{ float: "left", marginLeft: "1vw" }}>Reporte Capataz</h3>

      <div className="tabla_reporte">
        <DataTable
          style={{ width: "100%", height: "60%" }}
          columns={columns}
          data={state_obra.obra}
          onRowClicked={(row) => {
            navigate(`/actualizar_obras/${row.id}`);
          }}
          responsive
          striped
          filter={true}
          fixedHeader
          fixedHeaderScrollHeight="60vh"
          paginationRowsPerPageOptions={[10, 50, 100, 200, 500]}
        />
        <CSVLink
          headers={csv_headers}
          data={state_obra.obra}
          filename="Reporte Obras - Capataz.csv"
        >
          {/* headers={columns} */}
          <Button style={{ margin: 5 }}> Imprimir CSV</Button>
        </CSVLink>
      </div>
      {/* <AccordionComponent /> */}
    </>
  );
};

export default ReporteCapataz;
