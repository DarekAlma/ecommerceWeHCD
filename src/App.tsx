import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { useEffect, useState } from "react";

import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";
import Perfil from "./pages/perfil/Perfil";
import Start from "./pages/start/Start";
import AdminProfile from "./pages/adminProfile/AdminProfile";
import Error from "./pages/error/Error";

import { escucharSesion } from "./firebase/auth";

function RutaProtegida({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(undefined);

  useEffect(() => {
    const unsubscribe = escucharSesion((usuario) => {
      setUser(usuario);
    });

    return () => unsubscribe();
  }, []);

  if (user === undefined) return <div>Cargando...</div>;

  return user ? children : <Navigate to="/login" replace />;
}

function RutaPublica({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(undefined);

  useEffect(() => {
    const unsubscribe = escucharSesion((usuario) => {
      setUser(usuario);
    });

    return () => unsubscribe();
  }, []);

  if (user === undefined) return <div>Cargando...</div>;

  return user ? <Navigate to="/start" replace /> : children;
}

function App() {
  return (
    <Router>
      <Routes>

        {/* Públicas */}
        <Route
          path="/"
          element={
            <RutaPublica>
              <Login />
            </RutaPublica>
          }
        />

        <Route
          path="/login"
          element={
            <RutaPublica>
              <Login />
            </RutaPublica>
          }
        />

        <Route
          path="/signup"
          element={
            <RutaPublica>
              <Signup />
            </RutaPublica>
          }
        />

        {/* Privadas */}
        <Route
          path="/start"
          element={
            <RutaProtegida>
              <Start />
            </RutaProtegida>
          }
        />

        <Route
          path="/home"
          element={
            <RutaProtegida>
              <Home />
            </RutaProtegida>
          }
        />

        <Route
          path="/product"
          element={
            <RutaProtegida>
              <Product />
            </RutaProtegida>
          }
        />

        <Route
          path="/cart"
          element={
            <RutaProtegida>
              <Cart />
            </RutaProtegida>
          }
        />

        <Route
          path="/perfil"
          element={
            <RutaProtegida>
              <Perfil />
            </RutaProtegida>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin/profile"
          element={
            <RutaProtegida>
              <AdminProfile />
            </RutaProtegida>
          }
        />

        {/* Error visible para autenticado o no */}
        <Route path="/error" element={<Error />} />

        {/* Ruta no encontrada */}
        <Route
          path="*"
          element={
            <Navigate
              to="/error"
              state={{ codigo: "404" }}
              replace
            />
          }
        />

      </Routes>
    </Router>
  );
}

export default App;