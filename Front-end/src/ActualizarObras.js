import Encabezado from './Encabezado';

import { useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col, FormGroup, Label, Input} from 'reactstrap';


export default function ActualizarObras(){
  const navigate = useNavigate();
    const volver = ()=>{navigate('/profile')};

    return (
        <>
          <Encabezado boton={<Button color='primary' onClick={volver} style={{fontSize: '20px', display: 'inline', float: 'right'}}>volver</Button>}/>
          
          <div style={{width:'80vw', margin:'auto', marginTop:'30px'}}>
              <Formulario/>
          </div>
        </>
    );
}

function Formulario(){
  return(
  <Form>
      <Row>
          <Col md={6}>
          <FormGroup>
              <Label for="username">
              Nombre de Obra
              </Label>
              <Input id="ejemploUsuario" name="username" placeholder="Obra" type="text"/>
          </FormGroup>
          </Col>
          <Col md={6}>
          <FormGroup>
              <Label for="examplePassword">
              Encargado Principal
              </Label>
              <Input  id="ejemploContrasena" name="password" placeholder="Encargado" type="text"/>
          </FormGroup>
          </Col>
      </Row>
      <Row>
          <Col md={6}>
          <FormGroup>
              <Label for="name">
              Proveedores
              </Label>
              <Input id="ejemploNombre" name="name" placeholder="Nombres" type="text"/>
          </FormGroup>
          </Col>
          <Col md={6}>
          <FormGroup>
              <Label for="lastName">
              Pais
              </Label>
              <Input  id="ejemploApellidos" name="lastName" placeholder="pais" type="text"/>
          </FormGroup>
          </Col>
      </Row>
      <Row>
          <Col md={4}>
          <FormGroup>
              <Label for="id" style={{display:'block'}}>
              NIT
              </Label>
              <Input id="ejemploSelectId" name="selectId" type="select" style={{width:'20%', display:'inline'}}>
                  <option>NIT</option>
                  <option>OTRO</option>
              </Input>
              <Input id="ejemploId" name="id" placeholder="Numero" type="number" style={{width:'80%', display:'inline'}}/>
          </FormGroup>
          </Col>
          <Col md={4}>
          <FormGroup>
              <Label for="Mes de inicio">
              Mes de Inicio
              </Label>
              <Input  id="ejemploSelectGener" name="selectGener" type="select">
                  <option>Ene</option>
                  <option>Feb</option>
                  <option>Mar</option>
                  <option>Abr</option>
                  <option>May</option>
                  <option>Jun</option>
                  <option>Jul</option>
                  <option>Agos</option>
                  <option>Sept</option>
                  <option>Oct</option>
                  <option>Nov</option>
                  <option>Dic</option>
              </Input>
          </FormGroup>
          </Col>
          <Col md={4}>
          <FormGroup>
              <Label for="rol">
              Tipo de pago
              </Label>
              <Input  id="ejemploSelectRol" name="selectRol" type="select">
                  <option>Credito</option>
                  <option>Contado</option>
              </Input>
          </FormGroup>
          </Col>
      </Row>
      <Row>
          <Col md={6}>
          <FormGroup>
            <Label for="exampleAddress">
              Dirección
            </Label>
            <Input id="exampleAddress" name="address" placeholder="Cr 30 20-54"/>
          </FormGroup>
          </Col>
          <Col md={6}>
          <FormGroup>
              <Label for="exampleTel">
              Telefono
              </Label>
              <Input  id="ejemploTelefono" name="tel" placeholder="Numero Telefonico" type="number"/>
          </FormGroup>
          </Col>
      </Row>
      
      <FormGroup check style={{margin:'auto'}}>
          <Input id="exampleCheck" name="check" type="checkbox" style={{display:'inline', margin:'2px', float:'none'}}/>
          <Label check for="exampleCheck">
            Autorizo el tratamiento de datos
          </Label>
      </FormGroup>
      <Button color='primary'>
          Guardar
      </Button>
  </Form>
  );
}
