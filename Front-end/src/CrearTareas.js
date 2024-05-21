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
    id_obra: "",
    id_avance: "",
    is_active: true,
    id_db_capataz: "",
    new_usuarios_asignados: "",
    // nit: "",
    // nit_number: "",
    // mes_inicio: "",
    // tipo_pago: "",
    // direccion: "",
    // telefono: "",
  });

  const [users, setUsers] = useState([]);
  const [obra, setObra] = useState([]);
  const [Avances, setAvances] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const url = "http://localhost:8000/listar_usuarios";
    axios
      .post(url)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  useEffect(() => {
    const url = "http://localhost:8000/listar_obras";
    axios
      .post(url)
      .then((response) => {
        setObra(response.data);
        console.log(obra);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const url = "http://localhost:8000/listar_avances";
    axios

      .post(url)
      .then((response) => {
        setAvances(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //   console.log(obra);
  const handleSelect = (e) => {
    console.log(e.target.value);
    let selected_obra = [];
    for (let index = 0; index < obra.length; index++) {
      const element = obra[index];
      if (element.id == e.target.value) {
        selected_obra = element;
      }
    }
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
          console.log(response);
          setFormData({
            ...formData,
            id_db_capataz: response.data.id,
            usuarios_asignados: selected_obra.usuarios_asignados,
          });
        });
    }

    // obra.map((obra) => {
    //   obra = e.target.value;
    // });
    // console.log(selected_obra);
    // const { name, value } = e.target;

    // // console.log(name, value);
    // let usuario_asignado = "";
    // for (let i = 0; i < users.length; i++) {
    //   //   // console.log(users[i].id);
    //   if (users[i].id == value) {
    //     // // console.log(users[i].username);
    //     usuario_asignado = users[i].username;
    //   }
    // }
    // setFormData({
    //   ...formData,
    //   id_usuario_capataz: value,
    // });
  }; // Aquí deberías actualizar el estado de tu formulario con el valor seleccionado

  const handleSelectUser = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    // console.log(name, value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //   const handleSelectObra = (e) => {
  //     const { name, value } = e.target;
  //     let usuario_asignado = "";
  //     for (let i = 0; i < users.length; i++) {
  //       //   // console.log(users[i].id);
  //       if (users[i].id == value) {
  //         // // console.log(users[i].username);
  //         usuario_asignado = users[i].username;
  //       }
  //     }
  //     setFormData({
  //       ...formData,
  //       id_usuario_capataz: value,
  //     });
  //   }; // Aquí deberías actualizar el estado de tu formulario con el valor seleccionado

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheck = (e) => {
    // console.log(e.target.checked);
    const { name, value } = e.target;
    // console.log(name, value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: e.target.checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/editar_obra/" + id;
    const data = formData;
    // // console.log("Datos a enviar:", data);

    if (
      data.descripcion === "" ||
      data.id_usuario_capataz === "" ||
      data.estado === "" ||
      data.usuarios_asignados === "" ||
      data.id_obra === "" ||
      data.id_obra === "Seleccione una Obra" ||
      data.id_avance === "" ||
      data.id_avance === "Seleccione un Avance" ||
      data.is_active === ""
    ) {
      setError("Por favor, rellena todos los campos");
      return;
    } else {
      setError("");
      axios
        .post(url, data)
        .then((response) => {
          // // console.log("Respuesta del servidor:", response);
          // setWebResponse(response);
          console.log(response);
          if (response.status == 200 && response.statusText == "OK") {
            // Usuario autenticado, puedes redirigirlo a otra página o mostrar un mensaje de éxito
            // // // // console.log("Usuario autenticado:", response.data.user.username);

            // Redirige a la pantalla de bienvenida después del inicio de sesión
            setError(response.data.message);
            console.log(response.data.message);
            setTimeout(() => {
              navigate("/profile");
            }, 1000);
          }
        })
        .catch((error) => {
          console.log("Error al iniciar sesión:", error);
          // setWebError(error);
          setError(error.response.data.message);
        });
    }

    // Aquí puedes enviar los datos del formulario a tu servidor
    // // console.log(formData);
  };

  console.log(formData);
  console.log(obra);
  console.log(users);
  //   console.log(users);
  return (
    <Form>
      <Row>
        <Col md={6}>
          <Label for="descripcion">Descripción de la tarea</Label>
        </Col>
        <Col md={6}>
          <Label for="usuario_capataz">Capataz</Label>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            {/* <Input
              id="descripcion"
              name="descripcion"
              placeholder="Descripcion"
              type="textArea"
              value={formData.descripcion}
              onChange={handleChange}
            /> */}
            <textarea
              id="descripcion"
              name="descripcion"
              placeholder="Descripción"
              rows="4"
              cols="30"
              value={formData.descripcion}
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Input
              id="usuario_capataz"
              name="usuario_capataz"
              type="select"
              style={{ width: "60%", display: "inline" }}
              value={formData.id_db_capataz}
              onChange={(e) => handleSelectUser(e)}
              disabled
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
            <Label for="estado">Estado</Label>
            <Input
              id="estado"
              name="estado"
              placeholder="Estado de la Tarea"
              type="text"
              value={formData.estado}
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="Usuarios Asignados a la Tarea">
              Usuarios asignados
            </Label>
            <Input
              id="usuarios_asignados"
              name="usuarios_asignados"
              placeholder="Usuarios Asignados"
              type="text"
              value={formData.usuarios_asignados}
              //   onChange={handleChange}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="id" style={{ display: "block" }}>
              Seleccione una obra
            </Label>
            <Input
              id="id_obra"
              name="id_obra"
              type="select"
              style={{ width: "60%", display: "inline" }}
              //   value={formData.id_obra}
              onChange={(e) => handleSelect(e)}
            >
              <option>Seleccione una Obra</option>
              {obra.map((obra, index) => (
                <option key={index} value={obra.id}>
                  {obra.id} {obra.descripcion} {obra.id_usuario_capataz}{" "}
                  {obra.is_active}
                </option>
              ))}
            </Input>
            {/* <Input
              id="nit_number"
              name="nit_number"
              placeholder="Nit"
              type="number"
              min={0}
              style={{ width: "80%", display: "inline" }}
              value={formData.nit_number}
              onChange={handleChange}
            /> */}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="mes_inicio">Seleccione un avance</Label>
            <Input
              id="id_avance"
              name="id_avance"
              type="select"
              value={formData.id_avance}
              onChange={handleChange}
            >
              <option>Seleccione un Avance</option>
            </Input>
          </FormGroup>
        </Col>
        {/* <Col md={4}>
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
        </Col> */}
      </Row>
      {/* <Row>
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
      </Row> */}

      <FormGroup check style={{ margin: "auto" }}>
        <Input
          id="is_active"
          name="is_active"
          type="checkbox"
          style={{ display: "inline", margin: "2px", float: "none" }}
          //   value={formData.is_active}
          onChange={(e) => handleCheck(e)}
        />
        <Label check for="exampleCheck">
          Tarea activa
        </Label>
      </FormGroup>
      <Button color="primary" onClick={handleSubmit}>
        Crear tarea
      </Button>
      <br></br>
      {error && <p>{error}</p>}
    </Form>
  );
}
