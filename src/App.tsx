import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { useEffect, useState } from "react";

import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import ProductoSemilla from "./pages/productoSemilla/ProductoSemilla"; //
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import TestFirebase from "./TestFirebase";
import Cart from "./pages/Cart/Cart";
import Perfil from "./pages/perfil/Perfil";
import Start from "./pages/start/Start";
import Error from "./pages/error/Error";
import AdminProfile from "./pages/adminProfile/AdminProfile";
import ProductoTallo from "./pages/productoTallo/productoTallo";  
import ProductoFlor from "./pages/productoFlor/productoFlor";


import SurveyFlow from "./pages/survey/SurveyFlow";

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

/* SOLO ADMIN */
function RutaAdmin({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(undefined);

  useEffect(() => {
    const unsubscribe = escucharSesion((usuario) => {
      setUser(usuario);
    });

    return () => unsubscribe();
  }, []);

  if (user === undefined) return <div>Cargando...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.email !== "admin@bloommarket.com") {
    return (
      <Navigate
        to="/error"
        state={{ codigo: "403" }}
        replace
      />
    );
  }

  return children;
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
          path="/test"
          element={
            <RutaProtegida>
              <TestFirebase />
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
          path="/productosemilla"
          element={
            <RutaProtegida>
              <ProductoSemilla />  
            </RutaProtegida>
          }
        />

        <Route
          path="/productotallo"
          element={
            <RutaProtegida>
              <ProductoTallo />  {/* ← mayúscula */}
            </RutaProtegida>
          }
        />
        <Route
          path="/productoflor"
          element={
            <RutaProtegida>
              <ProductoFlor />  {/* ← mayúscula */}
            </RutaProtegida>
          }
        />


        <Route
          path="/product/:id"
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

        <Route
          path="/survey"
          element={
            <RutaProtegida>
              <SurveyFlow />
            </RutaProtegida>
          }
        />

        {/* SOLO ADMIN */}
        <Route
          path="/admin/profile"
          element={
            <RutaAdmin>
              <AdminProfile />
            </RutaAdmin>
          }
        />

        {/* Error visible para todos */}
        <Route path="/error" element={<Error />} />

        {/* Ruta inexistente */}
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