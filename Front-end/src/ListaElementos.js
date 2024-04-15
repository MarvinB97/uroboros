import React, { Component } from 'react';

let estilo_button_Editar = {display: 'inline', float:'right', width: '20%', fontSize:'15px', backgroundColor:'white', color: 'rgb(66, 135, 245)', border: '0.1px solid rgb(100, 100, 100)', borderRadius: '10px'};
let estilo_button_Eliminar = {display: 'inline', float:'right', width: '20%', fontSize:'15px', backgroundColor:'white', color: 'black', border: '0.1px solid rgb(100, 100, 100)', borderRadius: '10px'};
let estilo_li = {width:'100%'};
let estilo_button_Add = {width: '20%', fontSize:'15px', backgroundColor:'rgb(20, 65, 241)', color: 'white', border: '0.1px solid rgb(100, 100, 100)', borderRadius: '10px'};


class ListaElementos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [], // Almacenará los elementos
      currentItem: '', // El elemento actual que se está editando o agregando
    };
  }

  // Maneja el cambio en el formulario de entrada
  handleInputChange = (event) => {
    this.setState({ currentItem: event.target.value });
  }

  // Maneja la adición de un nuevo elemento
  addItem = () => {
    if (this.state.currentItem !== '') {
      this.setState({
        items: [...this.state.items, this.state.currentItem],
        currentItem: '',
      });
    }
  }

  // Maneja la eliminación de un elemento
  deleteItem = (index) => {
    const newItems = [...this.state.items];
    newItems.splice(index, 1);
    this.setState({ items: newItems });
  }

  render() {
    return (
      <>
        <ol>
          {this.state.items.map((item, index) => (
            <li key={index} style={estilo_li}>
              <p>{item} {index+1}  
              <button style={estilo_button_Eliminar} onClick={() => this.deleteItem(index)}>🗑️</button>
              <button style={estilo_button_Editar}>{'\u270E'}</button></p>
            </li>
          ))}
        </ol>
        <input type="text" placeholder="Ingrese un elemento" value={this.state.currentItem} onChange={this.handleInputChange}/>
        <button onClick={this.addItem} style={estilo_button_Add}>Agregar</button>
      </>
    );
  }
}

export default ListaElementos;
