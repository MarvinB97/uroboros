import {usuariosList} from './UsuariosLista.js';
import Encabezado from './Encabezado.js';

import { Button} from 'reactstrap';
import { useNavigate } from 'react-router-dom';



export default function Gerente(){
    const navigate = useNavigate();
    const volver = ()=>{navigate('/profile')};
    const usur = 'Gerente';
    
    return (
        <>
            {/* <Encabezado boton={<Button color='primary' onClick={volver} style={{fontSize: '20px', display: 'inline', float: 'right'}}>volver</Button>}/> */}
            <UsuarioInfo info={usur}/>
        </>
    );
}


function UsuarioInfo({info}){
  
    const dato = usuariosList.find(u => u.rol === info);
  
      return (
          <div style={{padding: '5vh'}}>
              <img className='photo-profile' src={dato.foto} alt="usuario"/>
              <h5>{dato.nombres + ' ' +dato.apellidos}</h5>
              <h6>{'Cargo: '+dato.rol}</h6>
              <p>{dato.tipoDoc+ ': ' +dato.documento}</p>
              <p>{'Genero: '+dato.genero}</p>
              <p>{'Celular: '+dato.celular}</p>
              <p>{'Dirección: '+dato.adress}</p>
          </div>        
      );
  }
