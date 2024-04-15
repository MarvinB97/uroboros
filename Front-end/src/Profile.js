/*
*------------------LIBRERIAS Y ARCHIVOS EXTERNOS-----------------
*/
import {usuariosList} from './UsuariosLista.js';
import ListaElementos from './ListaElementos.js';
import Encabezado from './Encabezado.js';
import {usu} from './Login.js';

import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

import { useNavigate } from 'react-router-dom';



/*
*------------------FUNCION PRINCIPAL-----------------
*/
export default function Profile(){

    let title =['Lista de Miembros', 'Lista de Obras'];
    const usur = usu;
    
    return (
        <div>
            <Encabezado className='Encabezado' boton={<Options/>}/>

            <div className='flexbox-container-profile'>
                <div className='column-one-profile'>
                    <ProfileColumnOne info={usur}/>
                </div>
                <div className='column-two-profile'>
                    <ButtonBar title={title[0]} elementos={<ListaElementos/>}/>
                </div>
                <div className='column-three-profile'>
                    <ButtonBar title={title[1]} elementos={<ListaElementos/>}/>
                </div>
            </div>
        </div>
    );
}



/*
*------------------COLUMNA UNO: MUESTRA LOS DATOS DEL USUARIO-----------------
*/
function ProfileColumnOne({info}){

  const navigate = useNavigate();
  const update = ()=>{navigate('/actualizar');};

  let estilo_button_EditarPerfil = {float:'buttom', width: '10%', fontSize:'20px', backgroundColor:'white', color: 'rgb(66, 135, 245)', border: '0.1px solid rgb(100, 100, 100)', borderRadius: '10px'};
  const dato = usuariosList.find(u => u.username === info);

    return (
        <>
            <img className='photo-profile' src={dato.foto} alt="usuario"/>
            <h5>{dato.nombres + ' ' +dato.apellidos}</h5>
            <h6>{'Cargo: '+dato.rol}</h6>
            <p>{dato.tipoDoc+ ': ' +dato.documento}</p>
            <p>{'Genero: '+dato.genero}</p>
            <p>{'Celular: '+dato.celular}</p>
            <p>{'Dirección: '+dato.adress}</p>
            <button style={estilo_button_EditarPerfil} onClick={update}>{'\u270E'}</button>
        </>        
    );
}



//----------COLAPPSE--------------
/*
*------------------COLUMNA DOS Y TRES: INFORMACION DE LAS OBRAS Y MIEMBROS-----------------
*/
function ButtonBar({args,title,elementos}) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const estilo_collapse = {margin: 'auto', width: '95%', color: 'rgb(71, 71, 71)', backgroundColor: 'rgb(158, 194, 255)'};

    return (
      <React.StrictMode className='buttonBar'>
        <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>
          {title}
        </Button>
        <Collapse className='card-profile' isOpen={isOpen} {...args} >
          <Card style={estilo_collapse}>
            <CardBody  style={estilo_collapse}>
              {elementos}
            </CardBody>
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
  const cerrarSesion = ()=>{navigate('/');};
  const acercaInf = ()=>{navigate('/acerca-de-nosotros');};

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} {...props} direction='down' style={{display: 'inline', float: 'right'}}> 
      <DropdownToggle caret size="lg" color='primary'>
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
