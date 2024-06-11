import React from "react";
import { Link } from "react-router-dom";
import star from "../star.png";
import "../css/sideBar.css";
import { Col, Row } from "reactstrap";

const Sidebar = () => {
  const rol = sessionStorage.getItem("rol");
  return (
    <div className="sidebar">
      <Row
        className="row_img"
        style={{ backgroundColor: "white", width: "100%", height: "16vh" }}
      >
        <Col style={{ paddingTop: "5vh" }}>
          <img src={star} className="Star-Prof" alt="Estrella" />
        </Col>
      </Row>
      <ul>
        {rol === "Director" ? (
          <li>
            <Link to="/dashboard_director" className="button-link">
              Dashboard
            </Link>
          </li>
        ) : rol === "Gerente" ? (
          <li>
            <Link to="/dashboard_gerente" className="button-link">
              Dashboard
            </Link>
          </li>
        ) : rol === "Capataz" ? (
          <li>
            <Link to="/dashboard_capataz" className="button-link">
              Dashboard
            </Link>
          </li>
        ) : null}

        <li>
          <Link to="/profile" className="button-link">
            Profile
          </Link>
        </li>

        {rol === "Director" ? (
          <li>
            <Link to="/obras" className="button-link">
              Reportes
            </Link>
          </li>
        ) : rol === "Gerente" ? (
          <li>
            <Link to="/obras" className="button-link">
              Reportes
            </Link>
          </li>
        ) : rol === "Capataz" ? (
          <li>
            <Link to="/reporte_capataz" className="button-link">
              Reportes
            </Link>
          </li>
        ) : null}
        {/* Agrega más enlaces según sea necesario */}
      </ul>
    </div>
  );
};

export default Sidebar;
