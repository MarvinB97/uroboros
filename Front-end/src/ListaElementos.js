import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

let estilo_button_Editar = {
  display: "inline",
  float: "right",
  width: "20%",
  fontSize: "15px",
  backgroundColor: "white",
  color: "rgb(66, 135, 245)",
  border: "0.1px solid rgb(100, 100, 100)",
  borderRadius: "10px",
};
let estilo_button_Eliminar = {
  display: "inline",
  float: "right",
  width: "20%",
  fontSize: "15px",
  backgroundColor: "white",
  color: "black",
  border: "0.1px solid rgb(100, 100, 100)",
  borderRadius: "10px",
};
let estilo_li = { width: "100%" };
let estilo_button_Add = {
  width: "60%",
  fontSize: "15px",
  backgroundColor: "rgb(20, 65, 241)",
  color: "white",
  border: "0.1px solid rgb(100, 100, 100)",
  borderRadius: "10px",
  padding: "2px",
  marginRigth: "10%",
  TextAlign: "center",
};

const ListaElementos = (navigate_data) => {
  console.log(navigate_data);
  const [state, setState] = useState({ usuario: [] });
  // useEffect(() => {
  //   axios
  //     .post("http://localhost:8000/listar_usuarios")
  //     .then((response) => {
  //       setState({
  //         data: response.data,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  const navigate = useNavigate();
  const actualizarObras = () => {
    navigate("/actualizar-obras");
  };

  // Función para añadir un nuevo elemento a la lista
  const handleAddElement = (e) => {
    // Verifica que el nuevo elemento no esté vacío

    if (navigate_data.navigate.origin === "crear_usuarios") {
      navigate("/signin");
    } else if (navigate_data.navigate.origin === "crear_obras") {
      console.log(e.target);
      navigate("/crear_obras");
    }
  };

  // Función para borrar un elemento de la lista
  // const handleDeleteElement = (index) => {
  //   // Crea una nueva lista sin el elemento a eliminar
  //   const nuevaLista = lista.filter((_, i) => i !== index);
  //   setLista(nuevaLista);
  // };

  return (
    <>
      {/* <ul>
        {lista.map((elemento, index) => (
          <li key={index} style={estilo_li}>
            <p>
              {index + 1} {elemento}
              <button
                style={estilo_button_Eliminar}
                onClick={() => handleDeleteElement(index)}
              >
                🗑️
              </button>
              <button
                style={estilo_button_Editar}
                onClick={() => actualizarObras()}
              >
                {"\u270E"}
              </button>
            </p>
          </li>
        ))}
      </ul> */}
      <br></br>
      <button onClick={(e) => handleAddElement(e)} style={estilo_button_Add}>
        Agregar
      </button>
    </>
  );
};

export default ListaElementos;
