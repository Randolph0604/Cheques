import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Nav from "./components/nav/Nav";
import Suppliers from "./components/suppliers/Suppliers";
import Documents from "./components/documents/Documents";
import PaymentConcept from "./components/paymentConcepts/PaymentConcepts";
import AccountingEntries from "./components/accountingEntries/accountingEntries";
import Solicitud from "./components/solicitud/Solicitud";
import Login from "./components/login/login";
import Usuarios from "./components/usuarios/Usuarios";
import { CssBaseline } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Consultar } from "./common/server/funcionesServidor";
import MensajeAlerta from "./common/mensajeAlerta/mensajeAlerta";

function App() {
  const [user, setUser] = useState(undefined);

  const onLogin = async ({ user, pass }) => {
    if (user === "admin" && pass === "1234") {
      setUser({
        User: user,
        Tipo: 2,
      });
    } else {
      const userConsultado = await Consultar(
        `api/usuarios/consultar`,
        null,
        undefined,
        {
          where: `Usuario = '${user}' and Pass = '${pass}'`,
        }
      );

      if (userConsultado.length) {
        setUser({
          User: userConsultado[0].User,
          Tipo: userConsultado[0].Tipo,
        });
      } else {
        MensajeAlerta("error", "Usuario o contraseña invalidos");
      }
    }
  };

  const logout = () => {
    setUser(undefined);
  };

  return (
    <Router>
      <CssBaseline />
      <ToastContainer />

      {user ? (
        <>
          <Nav logout={logout} user={user} />
          <Routes>
            {user.Tipo === 2 ? (
              <Route exact path="/Usuarios" element={<Usuarios />} />
            ) : null}
            <Route exact path="/paymentConcepts" element={<PaymentConcept />} />
            <Route exact path="/Suppliers" element={<Suppliers />} />
            <Route exact path="/Solicitud" element={<Solicitud />} />
            {/* <Route exact path="/Documents" element={<Documents />} /> */}
            {/* <Route
              exact
              path="/accountingEntries"
              element={<AccountingEntries />}
            /> */}
            <Route exact path="/" element={<Suppliers />} />
          </Routes>
        </>
      ) : (
        <Login onLogin={onLogin} />
      )}
    </Router>
  );
}

export default App;
