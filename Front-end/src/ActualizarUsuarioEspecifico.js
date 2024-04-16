import Encabezado from "./Encabezado";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { Button, Form, Row, Col, FormGroup, Label, Input } from "reactstrap";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Actualizar() {
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
  const { id } = useParams();
  //   console.log("ID de usuario:", id);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const [state, setState] = useState({ usuario: [] });

  //   const [formData, setFormData] = useState({
  //     username: "",
  //     password: "",
  //     name: "",
  //     lastName: "",
  //     selectId: "",
  //     document: "",
  //     selectGender: "",
  //     selectRol: "",
  //     address: "",
  //     tel: "",
  //     email: "",
  //     check: "",
  //   });

  useEffect(() => {
    const url_extra = "http://localhost:8000/extra_info/" + id;
    const config = {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    };
    const update_estudiante = async () => {
      try {
        const response = await axios.post(url_extra);
        setState(response.data.user_extra[0]);

        // setFormData({
        //   username: extra.data.user_extra[0].username,
        //   password: extra.data.user_extra[0].password,
        //   name: extra.data.user_extra[0].first_name,
        //   lastName: extra.data.user_extra[0].last_name,
        //   selectId: extra.data.user_extra[0].selectId,
        //   document: extra.data.user_extra[0].document,
        //   selectGender: extra.data.user_extra[0].gender,
        //   selectRol: extra.data.user_extra[0].rol,
        //   address: extra.data.user_extra[0].address,
        //   tel: extra.data.user_extra[0].tel,
        //   email: extra.data.user_extra[0].email,
        //   check: extra.data.user_extra[0].check,
        // });
      } catch (error) {}
    };
    update_estudiante();
  }, []);
  console.log(state);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    lastName: "",
    selectId: "",
    document: "",
    selectGender: "",
    selectRol: "",
    address: "",
    tel: "",
    email: "",
    check: "",
  });
  console.log(formData);

  //   console.log(extra.data.user_extra[0].username);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /**
   * Aquí se gestiona el envío del formulario al back end mediante una petición POST
   * @param {*} e
   * @returns void
   * @author @iMrStevenS2
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/actualizar_usuario_especifico/" + id;
    const data = state;
    console.log("Datos a enviar:", data);

    if (
      state.direccion === "" ||
      state.first_name === "" ||
      state.last_name === "" ||
      state.identificacion === "" ||
      state.password === "" ||
      state.telefono === "" ||
      state.username === "" ||
      state.genero === "Seleccione un Género" ||
      state.tipo_identificacion == "Tipo de documento" ||
      state.cargo === "Seleccione un rol" ||
      state.email === "" ||
      state.check === false
    ) {
      setError("Por favor, rellena todos los campos");
      return;
    } else {
      setError("");
      axios
        .post(url, data)
        .then((response) => {
          console.log("Respuesta del servidor:", response);
          // setWebResponse(response);
          if (
            response.request.status === 201 &&
            response.request.statusText === "Created"
          ) {
            // Usuario autenticado, puedes redirigirlo a otra página o mostrar un mensaje de éxito
            // // console.log("Usuario autenticado:", response.data.user.username);

            // Redirige a la pantalla de bienvenida después del inicio de sesión
            setError(response.data.message);
            // navigate("/profile");
          }
        })
        .catch((error) => {
          console.log("Error al iniciar sesión:", error);
          // setWebError(error);
          setError(error.response.data.message);
        });
    }

    // Aquí puedes enviar los datos del formulario a tu servidor
    console.log(formData);
  };

  return (
    <div style={{ width: "80%", paddingLeft: "20%" }}>
      <Form>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="">Usuario</Label>
              <Input
                id="ejemploUsuario"
                name="username"
                placeholder="Usuario"
                type="text"
                value={state.username}
                onChange={handleChange}
                disabled
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="examplePassword">Contraseña</Label>
              <Input
                id="ejemploContrasena"
                name="password"
                placeholder="Contraseña"
                type="password"
                value={state.password}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="name">Nombres</Label>
              <Input
                id="ejemploNombre"
                name="first_name"
                placeholder="Nombres"
                type="text"
                value={state.first_name}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="lastName">Apellidos</Label>
              <Input
                id="ejemploApellidos"
                name="last_name"
                placeholder="Apellidos"
                type="text"
                value={state.last_name}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <FormGroup>
              <Label for="id" style={{ display: "block" }}>
                Identificación
              </Label>
              <Input
                id="ejemploSelectId"
                name="tipo_identificacion"
                type="select"
                style={{ width: "40%", display: "inline" }}
                value={state.tipo_identificacion}
                onChange={handleChange}
              >
                <option>Tipo de documento</option>
                <option>CI</option>
                <option>TI</option>
                <option>CC</option>
                <option>DNI</option>
                <option>TP</option>
              </Input>
              <Input
                id="ejemploId"
                name="identificacion"
                placeholder="Numero de Identificación"
                type="number"
                style={{ width: "60%", display: "inline" }}
                value={state.identificacion}
                onChange={handleChange}
                min={0}
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="gener">Genero</Label>
              <Input
                id="ejemploSelectGener"
                name="genero"
                type="select"
                value={
                  state.genero == "Masculino" || state.genero == "M"
                    ? "M"
                    : state.genero == "Femenino" || state.genero == "F"
                    ? "F"
                    : "Otro"
                }
                onChange={handleChange}
              >
                <option>Selecione un Género</option>
                <option>M</option>
                <option>F</option>
                <option>Otro</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="rol">Cargo</Label>
              <Input
                id="ejemploSelectRol"
                name="cargo"
                type="select"
                value={state.cargo}
                onChange={handleChange}
              >
                <option>Seleccione un rol</option>
                <option>Administrador</option>
                <option>Desarrollador</option>
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
              <Label for="exampleAddress">Dirección</Label>
              <Input
                id="exampleAddress"
                name="direccion"
                placeholder="Cr 30 20-54"
                value={state.direccion}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleTel">Telefono</Label>
              <Input
                id="ejemploTelefono"
                name="telefono"
                placeholder="Numero Telefonico"
                type="number"
                value={state.telefono}
                onChange={handleChange}
                min={0}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="exampleEmail">Correo</Label>
              <Input
                id="ejemploEmail"
                name="email"
                placeholder="Correo"
                type="email"
                value={state.email}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
        </Row>

        <FormGroup check style={{ margin: "auto" }}>
          <Input
            id="exampleCheck"
            name="check"
            type="checkbox"
            style={{ display: "", margin: "2px", float: "none", width: "30px" }}
            value={
              state.check === false ||
              state.check === undefined ||
              state.check === null
                ? true
                : true
            }
            onChange={() =>
              setFormData((prevState) => ({
                ...prevState,
                check: !prevState.check,
              }))
            }
            checked={
              state.check === false ||
              state.check === undefined ||
              state.check === null
                ? true
                : true
            }
            //   onChange={handleChange}
          />
          <Label check for="exampleCheck">
            Autorizo el tratamiento de datos
          </Label>
        </FormGroup>
        <Button color="primary" onClick={handleSubmit}>
          Actualizar
        </Button>
        {error && <p>{error}</p>}
      </Form>
    </div>
  );
}
