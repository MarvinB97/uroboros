import Encabezado from "./Encabezado";

import { useNavigate } from "react-router-dom";
import { Button, Form, Row, Col, FormGroup, Label, Input } from "reactstrap";
import { useState } from "react";
import axios from "axios";

export default function Actualizar() {
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
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: sessionStorage.getItem("username"),
    password: sessionStorage.getItem("password"),
    name: sessionStorage.getItem("first_name"),
    lastName: sessionStorage.getItem("last_name"),
    selectId: sessionStorage.getItem("selectId"),
    document: sessionStorage.getItem("document"),
    selectGender: sessionStorage.getItem("gender"),
    selectRol: sessionStorage.getItem("rol"),
    address: sessionStorage.getItem("address"),
    tel: sessionStorage.getItem("tel"),
    email: sessionStorage.getItem("email"),
    check: sessionStorage.getItem("check"),
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
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
    const url = "http://localhost:8000/actualizar_usuario";
    // const url_persoa = "http://localhost:8000/actualizar_persona/";
    const data = formData;
    // console.log("Datos a enviar:", data);

    if (formData.document <= 0 || formData.tel <= 0) {
      setError("El campo de identificación o teléfono no puede ser menor a 0");
      return;
    } else if (
      formData.address === "" ||
      formData.name === "" ||
      formData.lastName === "" ||
      formData.document === "" ||
      formData.password === "" ||
      formData.tel === "" ||
      formData.username === "" ||
      formData.selectGender === "Seleccione un Género" ||
      formData.selectId == "Tipo de documento" ||
      formData.selectRol === "Seleccione un rol" ||
      formData.email === "" ||
      formData.check === false
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
            sessionStorage.clear();
            setTimeout(() => {
              navigate("/");
            }, 1000);

            // navigate("/profile");
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
                value={formData.username}
                onChange={handleChange}
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
                value={formData.password}
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
                name="name"
                placeholder="Nombres"
                type="text"
                value={formData.name}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="lastName">Apellidos</Label>
              <Input
                id="ejemploApellidos"
                name="lastName"
                placeholder="Apellidos"
                type="text"
                value={formData.lastName}
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
                name="selectId"
                type="select"
                style={{ width: "40%", display: "inline" }}
                value={formData.selectId}
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
                name="document"
                placeholder="Numero de Identificación"
                type="number"
                min={0}
                style={{ width: "60%", display: "inline" }}
                value={formData.document}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="gener">Genero</Label>
              <Input
                id="ejemploSelectGener"
                name="selectGender"
                type="select"
                value={
                  formData.selectGender == "Masculino"
                    ? "M"
                    : formData == "Femenino"
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
                name="selectRol"
                type="select"
                value={formData.selectRol}
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
                name="address"
                placeholder="Cr 30 20-54"
                value={formData.address}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleTel">Telefono</Label>
              <Input
                id="ejemploTelefono"
                name="tel"
                placeholder="Numero Telefonico"
                type="number"
                min={0}
                value={formData.tel}
                onChange={handleChange}
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
                value={formData.email}
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
            value={formData.check === true ? true : false}
            onChange={() =>
              setFormData((prevState) => ({
                ...prevState,
                check: !prevState.check,
              }))
            }
            checked={formData.check}
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
