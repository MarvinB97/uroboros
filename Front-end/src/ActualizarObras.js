import Encabezado from "./Encabezado";

import { useNavigate } from "react-router-dom";
import { Button, Form, Row, Col, FormGroup, Label, Input } from "reactstrap";
import { useEffect, useState } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";

export default function CrearObra() {
  const navigate = useNavigate();
  const volver = () => {
    navigate("/profile");
  };

  return (
    <>
      {/* <Encabezado
        boton={
          <Button
            color="primary"
            onClick={volver}
            style={{ fontSize: "20px", display: "inline", float: "right" }}
          >
            volver
          </Button>
        }
      /> */}

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
    id_db_capataz: "",
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
  const [obra, setObra] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const url = "http://localhost:8000/listar_usuarios";
    axios
      .post(url)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        // // console.log(error);
      });
  }, []);

  useEffect(() => {
    const url = "http://localhost:8000/listar_obra_especifica/" + id;
    axios
      .post(url)
      .then((response) => {
        setObra(response.data);
        setFormData({
          descripcion: response.data.descripcion,
          estado: response.data.estado,
          usuarios_asignados: response.data.usuarios_asignados,
          id_usuario_capataz: response.data.id_usuario_capataz,
          is_active: response.data.is_active,
          proveedores: response.data.proveedores,
          pais: response.data.pais,
          nit: response.data.nit,
          nit_number: response.data.nit_number,
          mes_inicio: response.data.mes_inicio,
          tipo_pago: response.data.tipo_pago,
          direccion: response.data.direccion,
          telefono: response.data.telefono,
        });
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  //   // console.log(obra);
  const handleSelect = (e) => {
    const { name, value } = e.target;
    let usuario_asignado = "";
    console.log(value);
    for (let i = 0; i < users.length; i++) {
      //   // // console.log(users[i].id);
      if (users[i].id == value) {
        console.log(users[i].username);
        usuario_asignado = users[i].username;
      }
    }
    setFormData({
      ...formData,
      id_usuario_capataz: value,
      id_db_capataz: value,
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

  const handleCheck = (e) => {
    // // console.log(e.target.checked);
    const { name, value } = e.target;
    // // console.log(name, value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: e.target.checked,
    }));
  };

  useEffect(() => {
    if (formData.id_usuario_capataz) {
      axios
        .post(
          "http://localhost:8000/listar_usuario_persona_obra/" +
            formData.id_usuario_capataz
        )
        .then((response) => {
          // console.log(response);
          setFormData({
            ...formData,
            id_db_capataz: response.data.id,
            // id_usuario_capataz: response.data.id,
            // usuarios_asignados: selected_obra.usuarios_asignados,
            // id_obra: selected_obra.id,
          });
        });
      // console.log(formData.id_db_capataz);
    }
  }, [formData.id_usuario_capataz]);

  const test = (e) => {
    // console.log(e.target.value);
    let selected_obra = [];
    for (let index = 0; index < obra.length; index++) {
      const element = obra[index];
      if (element.id == e.target.value) {
        selected_obra = element;
      }
    }
    // console.log(selected_obra);
    setFormData({
      ...formData,
      id_usuario_capataz: selected_obra.id_usuario_capataz,

      //   usuarios_asignados: selected_obra.usuarios_asignados,
    });

    if (selected_obra.id_usuario_capataz) {
      axios
        .post(
          "http://localhost:8000/listar_usuario_persona_obra/" +
            selected_obra.id_usuario_capataz
        )
        .then((response) => {
          // console.log(response);
          setFormData({
            ...formData,
            id_db_capataz: response.data.id,
            id_usuario_capataz: response.data.id,
            usuarios_asignados: selected_obra.usuarios_asignados,
            id_obra: selected_obra.id,
          });
        });
    }
  }; // Aquí deberías actualizar el estado de tu formulario con el valor seleccionado

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/editar_obra/" + id;
    const data = formData;
    // // // console.log("Datos a enviar:", data);

    if (
      data.descripcion === "" ||
      data.id_usuario_capataz === "" ||
      data.proveedores === "" ||
      data.proveedores === "Sin proveedores" ||
      data.pais === "" ||
      data.pais === "Sin pais" ||
      data.nit === "Seleccione un nit" ||
      data.nit_number === "" ||
      data.nit_number === "Sin NIT" ||
      data.mes_inicio === "Seleccione un mes" ||
      data.mes_inicio === "Sin mes de inicio" ||
      data.tipo_pago === "Seleccione un tipo de pago" ||
      data.tipo_pago === "Sin tipo de pago" ||
      data.direccion === "" ||
      data.direccion === "Sin direccion" ||
      data.telefono === "" ||
      data.telefono === "Sin telefono"
    ) {
      setError("Por favor, rellena todos los campos");
      return;
    } else {
      setError("");
      axios
        .post(url, data)
        .then((response) => {
          // // // console.log("Respuesta del servidor:", response);
          // setWebResponse(response);
          // console.log(response);
          if (response.status == 200 && response.statusText == "OK") {
            // Usuario autenticado, puedes redirigirlo a otra página o mostrar un mensaje de éxito
            // // // // // console.log("Usuario autenticado:", response.data.user.username);

            // Redirige a la pantalla de bienvenida después del inicio de sesión
            setError(response.data.message);
            // console.log(response.data.message);
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
    // // // console.log(formData);
  };
  const get_user_charge = (id) => {
    const url =
      "http://localhost:8000/listar_usuario_persona_obra/" +
      formData.id_usuario_capataz;
    axios
      .post(url)
      .then((response) => {
        setFormData({
          ...formData,
          id_usuario_capataz: response.data.id,
        });
      })
      .catch((error) => {
        // // console.log(error);
      });
  };
  console.log(formData);
  // console.log(users);
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
              value={formData.id_db_capataz}
              onChange={(e) => handleSelect(e)}
            >
              <option>Seleccione un usuario</option>
              {users.map((user, index) => (
                <option key={index} value={user.id}>
                  {user.id} {user.username}
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

      <FormGroup check style={{ margin: "auto" }}>
        <Input
          id="is_active"
          name="is_active"
          type="checkbox"
          style={{ display: "inline", margin: "2px", float: "none" }}
          value={formData.is_active}
          onChange={(e) => handleCheck(e)}
          checked={formData.is_active}
        />
        <Label check for="exampleCheck">
          Obra Activa
        </Label>
      </FormGroup>
      <Button color="primary" onClick={handleSubmit}>
        Actualizar
      </Button>
      <br></br>
      {error && <p>{error}</p>}
    </Form>
  );
}
