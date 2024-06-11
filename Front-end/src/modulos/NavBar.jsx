import React from "react";
// import './Navbar.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
import Encabezado from "../Encabezado";

function Options(props) {
  const navigate = useNavigate();
  const cerrarSesion = () => {
    sessionStorage.clear();
    navigate("/");
  };
  const acercaInf = () => {
    navigate("/acerca-de-nosotros");
  };
  const volver = () => {
    navigate("/profile");
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <>
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
          {/* <DropdownItem header>Perfil</DropdownItem> */}
          <DropdownItem onClick={acercaInf}>Acerca de nosotros</DropdownItem>
          <DropdownItem onClick={cerrarSesion}>Cerrar sesión</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {window.location.pathname === "/acerca-de-nosotros" ? (
        <Button
          color="primary"
          onClick={volver}
          style={{ fontSize: "20px", display: "inline", float: "right",  height: "48px"}}
        >
          volver
        </Button>
      ) : null}
    </>
  );
}

const Navbar = () => {
  const navigate = useNavigate();
  const volver = () => {
    navigate("/profile");
  };
  return (
    <>
      <nav className="navbar" style={{paddingLeft: "7vw", width: "100vw", marginRight: "0", paddingRight: "0", height:"16vh"}}>
        <Encabezado className="Encabezado" boton={<Options />} />
      </nav>
    </>
  );
};

export default Navbar;
