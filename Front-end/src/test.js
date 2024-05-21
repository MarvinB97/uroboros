import React, { Component, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
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

class ListaElementos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
    };

    // this.state = {
    //   items: [], // Almacenará los elementos
    //   currentItem: "", // El elemento actual que se está editando o agregando
    // };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const url = "http://localhost:8000/listar_usuarios";
    try {
      const response = await axios.post(url);

      this.setState({
        data: response.data,
      });
      // // console.log(response.data);
    } catch (error) {}
  };

  // Maneja el cambio en el formulario de entrada
  handleInputChange = (event) => {
    this.setState({ currentItem: event.target.value });
  };

  // Maneja la adición de un nuevo elemento
  addItem = () => {
    const { navigate } = this.props;
    // console.log(this.props);
    if (this.props.navigate.origin === "obras") {
      // navigate.navigate("");
    } else if (this.props.navigate.origin === "crear_usuarios") {
      navigate.navigate("/signin");
    }
    // if (this.state.currentItem !== '') {
    //   this.setState({
    //     items: [...this.state.items, this.state.currentItem],
    //     currentItem: '',
    //   });
    // }
  };

  // Maneja la eliminación de un elemento
  deleteItem = (index) => {
    const newItems = [...this.state.items];
    newItems.splice(index, 1);
    this.setState({ items: newItems });
  };

  render() {
    return (
      <>
        <ol>
          {/* {data.map((item, index) => (
            <li key={index} style={estilo_li}>
              <p>
                {item} {index + 1}
                <button
                  style={estilo_button_Eliminar}
                  onClick={() => this.deleteItem(index)}
                >
                  🗑️
                </button>
                <button style={estilo_button_Editar}>{"\u270E"}</button>
              </p>
            </li>
          ))} */}
        </ol>
        {/* <input
          type="text"
          placeholder="Ingrese un elemento"
          value={this.state.currentItem}
          onChange={this.handleInputChange}
        /> */}
        <button onClick={this.addItem} style={estilo_button_Add}>
          Agregar
        </button>
      </>
    );
  }
}

export default ListaElementos;