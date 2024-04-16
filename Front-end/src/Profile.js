/*
 *------------------LIBRERIAS Y ARCHIVOS EXTERNOS-----------------
 */
import { usuariosList } from "./UsuariosLista.js";
import ListaElementos from "./ListaElementos.js";
import Encabezado from "./Encabezado.js";
import { usu } from "./Login.js";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { useNavigate } from "react-router-dom";

/*
 *------------------FUNCION PRINCIPAL-----------------
 */
export default function Profile() {
  let title = ["Lista de Miembros", "Lista de Obras"];
  const usur = usu;
  const navigate = useNavigate();
  const [state, setState] = useState({ usuario: [] });

  const url = "http://localhost:8000/listar_usuarios";
  useEffect(() => {
    //   axios
    //     .post(url)
    //     .then((response) => {
    //       setItems({
    //         ...items,
    //         items: response.data.users,
    //       });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }, []);

    const fetchData = async () => {
      try {
        const response = await axios.post(url);

        setState({
          ...state,
          usuario: response.data,
        });
        console.log(response.data);
      } catch (error) {}
    };
    fetchData();
  }, []);
  console.log(state.usuario);
  let estilo_li = { width: "100%" };
  let estilo_button_Eliminar = {
    display: "inline",
    float: "right",
    width: "10%",
    fontSize: "15px",
    backgroundColor: "white",
    color: "black",
    border: "0.1px solid rgb(100, 100, 100)",
    borderRadius: "10px",
  };

  let estilo_button_Editar = {
    display: "inline",
    float: "right",
    width: "10%",
    fontSize: "15px",
    backgroundColor: "white",
    color: "rgb(66, 135, 245)",
    border: "0.1px solid rgb(100, 100, 100)",
    borderRadius: "10px",
  };
  const rol = sessionStorage.getItem("rol");

  const handleUpdateData = (e, item) => {
    console.log(item);
    navigate("/actualizar_usuario_especifico/" + item.id);
  };

  const handleDeactivation = (e, item) => {
    console.log("Eliminando...");
    console.log(item);
    const url = "http://localhost:8000/eliminar_usuario/" + item.id;
    axios
      .post(url, item)
      .then((response) => {
        console.log(response);
        const fetchData = async () => {
          try {
            const response = await axios.post(url);

            console.log(response.message);
            window.location.reload();
          } catch (error) {}
        };
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Encabezado className="Encabezado" boton={<Options />} />

      <div className="flexbox-container-profile">
        <div className="column-one-profile">
          <ProfileColumnOne info={usur} />
        </div>
        <div className="column-two-profile" style={{ width: "60%" }}>
          <ButtonBar
            style={{ width: "60%" }}
            title={title[0]}
            elementos={
              <ol style={{ width: "100%" }}>
                {state.usuario === "" ||
                state.usuario === "undefined" ||
                state.usuario.length <= 0
                  ? "Cargando Datos..."
                  : state.usuario.map((item, index) => (
                      <li key={index}>
                        <p style={estilo_li}>
                          {item.identificacion} {item.name} {item.cargo}
                          {item.status == true ? " Activo" : " Inactivo"}
                          <button
                            style={estilo_button_Eliminar}
                            onClick={(e) => handleDeactivation(e, item)}
                          >
                            🗑️
                          </button>
                          {rol === "Administrador" ||
                          rol === "Desarrollador" ||
                          rol === "Gerente" ||
                          rol === "Director" ? (
                            <button
                              style={estilo_button_Editar}
                              onClick={(e) => handleUpdateData(e, item)}
                            >
                              {"\u270E"}
                            </button>
                          ) : (
                            <p></p>
                          )}
                        </p>
                      </li>
                    ))}
                <ListaElementos
                  navigate={{
                    navigate,
                    origin: "crear_usuarios",
                    data: state.usuario,
                  }}
                />
              </ol>
            }
          />
        </div>
        <div className="column-three-profile">
          <ButtonBar
            title={title[1]}
            elementos={
              <ListaElementos navigate={{ navigate, origin: "obras" }} />
            }
          />
        </div>
      </div>
    </div>
  );
}

/*
 *------------------COLUMNA UNO: MUESTRA LOS DATOS DEL USUARIO-----------------
 */
function ProfileColumnOne({ info }) {
  const navigate = useNavigate();
  const update = () => {
    navigate("/actualizar");
  };

  let estilo_button_EditarPerfil = {
    float: "buttom",
    width: "10%",
    fontSize: "20px",
    backgroundColor: "white",
    color: "rgb(66, 135, 245)",
    border: "0.1px solid rgb(100, 100, 100)",
    borderRadius: "10px",
  };

  const user_info = {
    nombres: sessionStorage.getItem("first_name"),
    apellidos: sessionStorage.getItem("last_name"),
    rol: sessionStorage.getItem("rol"),
    tipoDoc: sessionStorage.getItem("selectId"),
    documento: sessionStorage.getItem("document"),
    genero: sessionStorage.getItem("gender"),
    celular: sessionStorage.getItem("tel"),
    adress: sessionStorage.getItem("address"),
    foto: sessionStorage.getItem("foto"),
  };
  console.log(sessionStorage.foto);

  return (
    <>
      <div class="container" style={{ width: "100%" }}>
        <img
          className="photo-profile"
          src={
            user_info.foto !== "" || user_info.foto === "undefined"
              ? user_info.foto
              : "https://img.freepik.com/free-photo/user-front-side-with-white-background_187299-40007.jpg?t=st=1713212440~exp=1713216040~hmac=5525e22d6ddebb8d14e7f939722504e547ebe43969dc0837d164ec7cfb48d989&w=740"
          }
          style={{ width: "50%", height: "30%" }}
          alt="usuario"
        />
        {user_info.foto === "" || user_info.foto == "undefined" ? (
          <div class="bottom-right" style={{ color: "black" }}>
            Dedigned by{" "}
            {
              <a href="http://www.freepik.com/" style={{ color: "white" }}>
                FreePik
              </a>
            }
          </div>
        ) : (
          <p></p>
        )}
      </div>

      <h5>{user_info.nombres + " " + user_info.apellidos}</h5>
      <h6>{"Cargo: " + user_info.rol}</h6>
      <p>{user_info.tipoDoc + ": " + user_info.documento}</p>
      <p>{"Genero: " + user_info.genero}</p>
      <p>{"Celular: " + user_info.celular}</p>
      <p>{"Dirección: " + user_info.adress}</p>
      <button style={estilo_button_EditarPerfil} onClick={update}>
        {"\u270E"}
      </button>
    </>
  );
}

//----------COLAPPSE--------------
/*
 *------------------COLUMNA DOS Y TRES: INFORMACION DE LAS OBRAS Y MIEMBROS-----------------
 */
function ButtonBar({ args, title, elementos }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const estilo_collapse = {
    margin: "auto",
    width: "95%",
    color: "rgb(71, 71, 71)",
    backgroundColor: "rgb(158, 194, 255)",
  };

  return (
    <React.StrictMode className="buttonBar">
      <Button color="primary" onClick={toggle} style={{ marginBottom: "1rem" }}>
        {title}
      </Button>
      <Collapse className="card-profile" isOpen={isOpen} {...args}>
        <Card style={estilo_collapse}>
          <CardBody style={estilo_collapse}>{elementos}</CardBody>
        </Card>
      </Collapse>
    </React.StrictMode>
  );
}

//--------------DROPDOWN-------------
/*
 *------------------BOTON DE OPCIONES: PERMITE VER INF O CERRAR SESION-----------------
 */
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
