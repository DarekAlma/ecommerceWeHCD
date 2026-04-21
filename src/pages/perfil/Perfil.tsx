import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import "./Perfil.css";
import { useNavigate } from "react-router-dom";
import { cerrarSesion, escucharSesion } from "../../firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const Perfil: React.FC = () => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("Usuario");
  const [correo, setCorreo] = useState("ejemplo@gmail.com");
  const [nivelMascota, setNivelMascota] = useState("4");

  useEffect(() => {
    const unsubscribe = escucharSesion(async (user) => {
      if (!user) {
        navigate("/login");
        return;
      }

      setCorreo(user.email || "Sin correo");

      try {
        const ref = doc(db, "usuarios", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();

          setUsuario(data.nombre || "Usuario");
          setNivelMascota(data.nivelMascota || "1");
        }
      } catch (error) {
        console.error(error);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleCerrarSesion = async () => {
    await cerrarSesion();
    navigate("/login");
  };

  const handleInicio = () => {
    navigate("/home");
  };

  return (
    <div className="perfil">

      <Header />

      <div className="perfil_card">

        {/* LEFT */}
        <div className="perfil_content">

          <h1 className="perfil_title">BloomMarket</h1>
          <h2 className="perfil_subtitle">Mi Perfil</h2>

          <div className="container-text-perfil">
            <p>
              <span>Usuario:</span> {usuario}
            </p>

            <p>
              <span>Correo:</span> {correo}
            </p>

            <p>
              <span>Nivel de mi mascota:</span> {nivelMascota}
            </p>
          </div>

          <div className="botones-perfil">
            <button
              className="btn-pag-principal"
              onClick={handleInicio}
            >
              Ir a la página principal
            </button>

            <button
              className="btn-cerrar"
              onClick={handleCerrarSesion}
            >
              Cerrar sesión
            </button>
          </div>

        </div>

        {/* RIGHT */}
        <div className="image-section-perfil">
          <div className="image-container-perfil">
            <img
              src={nivelMascota === "1" ? "/semilla.png" : "/flor.png"}
              alt="mascota"
            />
          </div>
        </div>

      </div>

    </div>
  );
};

export default Perfil;