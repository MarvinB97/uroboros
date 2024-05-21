import Encabezado from "./Encabezado";

import { useNavigate } from "react-router-dom";
import { Button, Form, Row, Col, FormGroup, Label, Input } from "reactstrap";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CrearObra() {
  const navigate = useNavigate();
  const volver = () => {
    navigate("/profile");
  };

  return (
    <>
      <Encabezado
        boton={
          <Button
            color="primary"
            onClick={volver}
            style={{ fontSize: "20px", display: "inline", float: "right" }}
          >
            volver
          </Button>
        }
      />

      <div style={{ width: "80vw", margin: "auto", marginTop: "30px" }}>
        <Formulario />
      </div>
    </>
  );
}

function Formulario() {
  const [formData, setFormData] = useState({
    descripcion: "",
    estado: "",
    usuarios_asignados: "",
    id_usuario_capataz: "",
    is_active: true,
    proveedores: "",
    pais: "",
    nit: "",
    nit_number: "",
    mes_inicio: "",
    tipo_pago: "",
    direccion: "",
    telefono: "",
  });

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const url = "http://localhost:8000/listar_usuarios";
    axios
      .post(url)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSelect = (e) => {
    const { name, value } = e.target;
    let usuario_asignado = "";
    for (let i = 0; i < users.length; i++) {
      //   console.log(users[i].id);
      if (users[i].id == value) {
        // console.log(users[i].username);
        usuario_asignado = users[i].username;
      }
    }
    setFormData({
      ...formData,
      id_usuario_capataz: value,
      estado: "En Proceso",
      usuarios_asignados: usuario_asignado,
    });
  }; // Aquí deberías actualizar el estado de tu formulario con el valor seleccionado

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/crear_obra";
    const data = formData;
    // console.log("Datos a enviar:", data);

    if (
      data.descripcion === "" ||
      data.id_usuario_capataz === "" ||
      data.proveedores === "" ||
      data.pais === "" ||
      data.nit === "Seleccione un nit" ||
      data.nit_number === "" ||
      data.mes_inicio === "Seleccione un mes" ||
      data.tipo_pago === "Seleccione un tipo de pago" ||
      data.direccion === "" ||
      data.telefono === ""
    ) {
      setError("Por favor, rellena todos los campos");
      return;
    } else {
      setError("");
      axios
        .post(url, data)
        .then((response) => {
          // console.log("Respuesta del servidor:", response);
          // setWebResponse(response);
          if (
            response.request.status === 201 &&
            response.request.statusText === "Created"
          ) {
            // Usuario autenticado, puedes redirigirlo a otra página o mostrar un mensaje de éxito
            // // // console.log("Usuario autenticado:", response.data.user.username);

            // Redirige a la pantalla de bienvenida después del inicio de sesión
            setError(response.data.message);
            setTimeout(() => {
              navigate("/profile");
            }, 1000);
          }
        })
        .catch((error) => {
          // console.log("Error al iniciar sesión:", error);
          // setWebError(error);
          setError(error.response.data.message);
        });
    }

    // Aquí puedes enviar los datos del formulario a tu servidor
    // console.log(formData);
  };
  console.log(formData);
  console.log(users);
  return (
    <Form>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="descripcion">Nombre de Obra</Label>
            <Input
              id="descripcion"
              name="descripcion"
              placeholder="Obra"
              type="text"
              value={formData.descripcion}
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="usuario_capataz">Encargado Principal</Label>
            <Input
              id="usuario_capataz"
              name="usuario_capataz"
              type="select"
              style={{ width: "60%", display: "inline" }}
              //   value={formData.nit}
              onChange={(e) => handleSelect(e)}
            >
              <option>Seleccione un usuario</option>
              {users.map((user, index) => (
                <option key={index} value={user.id}>
                  {user.username}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="proveedores">Proveedores</Label>
            <Input
              id="proveedores"
              name="proveedores"
              placeholder="Nombres"
              type="text"
              value={formData.proveedores}
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="pais">Pais</Label>
            <Input
              id="pais"
              name="pais"
              placeholder="pais"
              type="text"
              value={formData.pais}
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <FormGroup>
            <Label for="id" style={{ display: "block" }}>
              NIT
            </Label>
            <Input
              id="nit"
              name="nit"
              type="select"
              style={{ width: "60%", display: "inline" }}
              value={formData.nit}
              onChange={handleChange}
            >
              <option>Seleccione un nit</option>
              <option>NIT</option>
              <option>OTRO</option>
            </Input>
            <Input
              id="nit_number"
              name="nit_number"
              placeholder="Nit"
              type="number"
              min={0}
              style={{ width: "80%", display: "inline" }}
              value={formData.nit_number}
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="mes_inicio">Mes de Inicio</Label>
            <Input
              id="mes_inicio"
              name="mes_inicio"
              type="select"
              value={formData.mes_inicio}
              onChange={handleChange}
            >
              <option>Seleccione un mes</option>
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
            <Label for="tipo_pago">Tipo de pago</Label>
            <Input
              id="tipo_pago"
              name="tipo_pago"
              type="select"
              value={formData.tipo_pago}
              onChange={handleChange}
            >
              <option>Seleccione un tipo de pago</option>
              <option>Credito</option>
              <option>Contado</option>
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="direccion">Dirección</Label>
            <Input
              id="direccion"
              name="direccion"
              placeholder="Cr 30 20-54"
              type="text"
              value={formData.direccion}
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="telefono">Telefono</Label>
            <Input
              id="telefono"
              name="telefono"
              placeholder="Numero Telefonico"
              type="number"
              min={0}
              step={1}
              value={formData.telefono}
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
      </Row>

      {/* <FormGroup check style={{ margin: "auto" }}> */}
      {/* <Input
          id="exampleCheck"
          name="check"
          type="checkbox"
          style={{ display: "inline", margin: "2px", float: "none" }}
        /> */}
      {/* <Label check for="exampleCheck">
          Autorizo el tratamiento de datos
        </Label> */}
      {/* </FormGroup> */}
      <Button color="primary" onClick={handleSubmit}>
        Crear
      </Button>
      <br></br>
      {error && <p>{error}</p>}
    </Form>
  );
}
