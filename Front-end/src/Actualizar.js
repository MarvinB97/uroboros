import Encabezado from './Encabezado';

import { useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col, FormGroup, Label, Input} from 'reactstrap';


export default function Actualizar(){
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
              Usuario
              </Label>
              <Input id="ejemploUsuario" name="username" placeholder="Usuario" type="text"/>
          </FormGroup>
          </Col>
          <Col md={6}>
          <FormGroup>
              <Label for="examplePassword">
              Contraseña
              </Label>
              <Input  id="ejemploContrasena" name="password" placeholder="Contraseña" type="password"/>
          </FormGroup>
          </Col>
      </Row>
      <Row>
          <Col md={6}>
          <FormGroup>
              <Label for="name">
              Nombres
              </Label>
              <Input id="ejemploNombre" name="name" placeholder="Nombres" type="text"/>
          </FormGroup>
          </Col>
          <Col md={6}>
          <FormGroup>
              <Label for="lastName">
              Apellidos
              </Label>
              <Input  id="ejemploApellidos" name="lastName" placeholder="Apellidos" type="text"/>
          </FormGroup>
          </Col>
      </Row>
      <Row>
          <Col md={4}>
          <FormGroup>
              <Label for="id" style={{display:'block'}}>
              Identificación
              </Label>
              <Input id="ejemploSelectId" name="selectId" type="select" style={{width:'20%', display:'inline'}}>
                  <option>CI</option>
                  <option>TI</option>
                  <option>CC</option>
                  <option>DNI</option>
                  <option>TP</option>
              </Input>
              <Input id="ejemploId" name="id" placeholder="Numero de Identificación" type="number" style={{width:'80%', display:'inline'}}/>
          </FormGroup>
          </Col>
          <Col md={4}>
          <FormGroup>
              <Label for="gener">
              Genero
              </Label>
              <Input  id="ejemploSelectGener" name="selectGener" type="select">
                  <option>M</option>
                  <option>F</option>
                  <option>Otro</option>
              </Input>
          </FormGroup>
          </Col>
          <Col md={4}>
          <FormGroup>
              <Label for="rol">
              Cargo
              </Label>
              <Input  id="ejemploSelectRol" name="selectRol" type="select">
                  <option>Gerente</option>
                  <option>Director</option>
                  <option>Capataz</option>
                  <option>Otro</option>
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
          Sign in
      </Button>
  </Form>
  );
}
