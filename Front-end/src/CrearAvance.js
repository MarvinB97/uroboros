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
    observaciones: "",
    notas_voz: "",
    is_active: true,
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
        // // console.log(error);
      });
  }, []);

  useEffect(() => {
    const url = "http://localhost:8000/listar_obras";
    axios
      .post(url)
      .then((response) => {
        setObra(response.data);
        // console.log(obra);
      })
      .catch((error) => {
        // console.log(error);
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
        // console.log(error);
      });
  }, []);

  //   // console.log(obra);
  const handleSelect = (e) => {
    // console.log(e.target.value);
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
          // console.log(response);
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
    // // console.log(selected_obra);
    // const { name, value } = e.target;

    // // // console.log(name, value);
    // let usuario_asignado = "";
    // for (let i = 0; i < users.length; i++) {
    //   //   // // console.log(users[i].id);
    //   if (users[i].id == value) {
    //     // // // console.log(users[i].username);
    //     usuario_asignado = users[i].username;
    //   }
    // }
    // setFormData({
    //   ...formData,
    //   id_usuario_capataz: value,
    // });
  }; // Aquí deberías actualizar el estado de tu formulario con el valor seleccionado

  const handleSelectUser = (e) => {
    // // console.log(e.target.value);
    const { name, value } = e.target;
    // // console.log(name, value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //   const handleSelectObra = (e) => {
  //     const { name, value } = e.target;
  //     let usuario_asignado = "";
  //     for (let i = 0; i < users.length; i++) {
  //       //   // // console.log(users[i].id);
  //       if (users[i].id == value) {
  //         // // // console.log(users[i].username);
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
    // console.log(e.target);
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

  const handleCrearAvance = () => {
    navigate("/crear_avance");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/crear_avance";
    const data = formData;
    // // // console.log("Datos a enviar:", data);

    if (
      data.descripcion === "" ||
      data.observaciones === "" ||
      data.notas_voz === "" ||
      data.is_active === ""
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
          if (response.status == 201 && response.statusText == "Created") {
            // Usuario autenticado, puedes redirigirlo a otra página o mostrar un mensaje de éxito
            // // // // // console.log("Usuario autenticado:", response.data.user.username);

            // Redirige a la pantalla de bienvenida después del inicio de sesión
            setError(response.data.message);
            // console.log(response.data.message);
            setTimeout(() => {
              navigate("/crear_tareas");
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

  // console.log(formData);
  // console.log(obra);
  // console.log(users);
  //   // console.log(users);
  return (
    <Form>
      <Row>
        <Col md={6}>
          <Label for="descripcion">Descripción del avance</Label>
        </Col>
        <Col md={6}>
          <Label for="usuario_capataz">Observaciones</Label>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <textarea
              id="descripcion"
              name="descripcion"
              placeholder="Descripción"
              rows="4"
              cols="40"
              value={formData.descripcion}
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            {/* <Input
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
            </Input> */}
            <textarea
              id="observaciones"
              name="observaciones"
              placeholder="observaciones"
              rows="4"
              cols="40"
              value={formData.observaciones}
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <Label for="notas_voz">Notas de voz para el avance</Label>
        </Col>
        {/* <Col md={6}>
          <Label for="Usuarios Asignados a la Tarea">Usuarios asignados</Label>
        </Col> */}
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <textarea
              id="notas_voz"
              name="notas_voz"
              placeholder="Notas de 'voz'"
              rows="4"
              cols="40"
              value={formData.notas_voz}
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
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
