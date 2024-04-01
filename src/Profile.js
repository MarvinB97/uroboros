import {usuariosList} from './UsuariosLista.js';

import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

import { useNavigate } from 'react-router-dom';

import star from './star.png';
import logo from './logo2.png';
import {usu} from './Login.js';


//import { datos } from './Login.js';


export default function Profile(){//
    let n=10;//longitud de la lista
    const description = [[],[]];

    for(let i=0;i<2; i++){

        const des = [];

        for(let j=0;j<n; j++){
            des.push('elemento '+ (j+1) +' de la lista \n'); 
        }
        description[i] = des;
    }


    let title =['Lista de Miembros', 'Lista de Obras'];

    const usur = usu;
    
    return (
        <div>
            <header className='App-header'>
                <ProfileHeader/>
                <hr/>
            </header>
            <div className='flexbox-container-profile'>
                <div className='column-one-profile'>
                    <ProfileColumnOne info={usur}/>
                </div>
                <div className='column-two-profile'>
                    <ButtonBar title={title[0]} description={description[0]}/>
                </div>
                <div className='column-three-profile'>
                    <ButtonBar title={title[1]} description={description[1]}/>
                </div>
            </div>
        </div>
    );
}





function ProfileHeader(){
    return (
    <>
        <img src={star} className="Star-Prof" alt="Estrella" />
        <img src={logo} className='App-logo-Prof' alt='logo'/>
        Costructora Uroboros
        <Options className='opciones-button'/>
    </>
);
}

function ProfileColumnOne({info}){
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
        </>        
    );
}



//----------COLAPPSE--------------

function ButtonBar({args,title,description}) {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);
  
    const estilo = {margin: 'auto', width: '90%', color: 'rgb(71, 71, 71)', backgroundColor: 'rgb(48, 185, 219)'};


    return (
      <React.StrictMode className='buttonBar'>
        <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>
          {title}
        </Button>
        <Collapse className='card-profile' isOpen={isOpen} {...args} >
          <Card style={estilo}>
            <CardBody  style={estilo}>
              {description}
            </CardBody>
          </Card>
        </Collapse>
      </React.StrictMode>
    );
  }



  //--------------DROPDOWN-------------

function Options(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const navigate = useNavigate();

  const cerrarSesion = ()=>{navigate('/');};

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} {...props} style={{width: '10vw', display: 'inline',float: 'right'}}>
      <DropdownToggle caret size="lg" color='primary'>
        Opciones
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>Perfil</DropdownItem>
        <DropdownItem>Acerca de nosotros</DropdownItem>
        <DropdownItem onClick={cerrarSesion}>Cerrar sesión</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}