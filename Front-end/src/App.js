import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./css/App.css";
import "./css/ContentRouters.css";

import Login from "./Login.js";
import Profile from "./Profile.js";
import Actualizar from "./Actualizar.js";
import ActualizarUsuarioEspecifico from "./ActualizarUsuarioEspecifico.js";
import AcercaDeNosotros from "./AcercaDeNosotros.js";
import Signin from "./Signin.js";
import CrearTareas from "./CrearTareas.js";

import CrearObra from "./CrearObra.js";
import ActualizarObras from "./ActualizarObras.js";
import Gerente from "./Gerente.js";
import RetrievePassword from "./RetrievePassword.js";
import CrearAvance from "./CrearAvance.js";

import DashboardCapataz from "./components/dashboards/dashboardCapataz.jsx";
import DashboardGerente from "./components/dashboards/dashboardGerente.jsx";
import DashboardDirector from "./components/dashboards/dashboardDirector.jsx";

import Sidebar from "./modulos/sideBar.jsx";
import Navbar from "./modulos/NavBar.jsx";

const App = () => {
  return (
    <div className="App">
      <Router>
        <MainLayout />
      </Router>
    </div>
  );
};

const MainLayout = () => {
  const location = useLocation();
  const showSidebar = location.pathname !== "/login";
  const token = sessionStorage.getItem("token");
  const rol = sessionStorage.getItem("rol");
  const autenticado = !!token;
  return (
    <>
      {showSidebar && <Navbar />}
      {showSidebar && <Sidebar />}
      <div className="content">
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to={
                  autenticado
                    ? "/dashboard_capataz"
                    : autenticado && rol == "Gerente"
                    ? "/dashboard_gerente"
                    : autenticado && rol == "Director de Obra"
                    ? "/dashboard_director"
                    : "/login"
                }
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <ProteccionDeRuta>
                <Profile />
              </ProteccionDeRuta>
            }
          />
          <Route
            path="/dashboard_capataz"
            element={
              <ProteccionDeRuta>
                <DashboardCapataz />
              </ProteccionDeRuta>
            }
          />
          <Route
            path="dashboard_gerente"
            element={
              <ProteccionDeRuta>
                <DashboardGerente />
              </ProteccionDeRuta>
            }
          />
          <Route
            path="/dashboard_director"
            element={
              <ProteccionDeRuta>
                <DashboardDirector />
              </ProteccionDeRuta>
            }
          />
          <Route
            path="/signin"
            element={
              <ProteccionDeRuta>
                <Signin />
              </ProteccionDeRuta>
            }
          />
          <Route
            path="/recuperar-contrasena"
            element={
              <ProteccionDeRuta>
                <RetrievePassword />
              </ProteccionDeRuta>
            }
          />
          <Route
            path="/actualizar"
            element={
              <ProteccionDeRuta>
                <Actualizar />
              </ProteccionDeRuta>
            }
          />
          <Route
            path="crear_obras"
            element={
              <ProteccionDeRuta>
                <CrearObra />
              </ProteccionDeRuta>
            }
          />
          <Route
            path="/actualizar_obras/:id"
            element={
              <ProteccionDeRuta>
                <ActualizarObras />
              </ProteccionDeRuta>
            }
          />
          <Route
            path="/crear_tareas"
            element={
              <ProteccionDeRuta>
                <CrearTareas />
              </ProteccionDeRuta>
            }
          />
          <Route
            path="/crear_avance"
            element={
              <ProteccionDeRuta>
                <CrearAvance />
              </ProteccionDeRuta>
            }
          />
          <Route
            path="/gerente"
            element={
              <ProteccionDeRuta>
                <Gerente />
              </ProteccionDeRuta>
            }
          />
          <Route
            path="/actualizar_usuario_especifico/:id"
            element={
              <ProteccionDeRuta>
                <ActualizarUsuarioEspecifico />
              </ProteccionDeRuta>
            }
          />
          <Route
            path="/acerca-de-nosotros"
            element={
              <ProteccionDeRuta>
                <AcercaDeNosotros />
              </ProteccionDeRuta>
            }
          />
        </Routes>
      </div>
    </>
  );
};

const ProteccionDeRuta = ({ children }) => {
  const token = sessionStorage.getItem("token");
  const autenticado = !!token;

  return autenticado ? children : <Navigate to="/login" />;
};

export default App;
