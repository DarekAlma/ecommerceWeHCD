import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import "./Perfil.css";
import { useNavigate } from "react-router-dom";
import { cerrarSesion, escucharSesion } from "../../firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import type { PetState } from "../../types/survey";

const Perfil: React.FC = () => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState<string>("");
  const [correo, setCorreo] = useState<string>("");
  const [petState, setPetState] = useState<PetState>("semilla");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = escucharSesion(async (user) => {
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        setCorreo(user.email || "Sin correo");

        const ref = doc(db, "usuarios", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          setUsuario(data.nombre || "Usuario");
          setPetState((data.survey?.petState as PetState) ?? "semilla");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // 🔥 clave
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

  // 🔥 pantalla de carga (evita placeholders)
  if (loading) {
    return (
      <div className="perfil">
        <Header />
        <div style={{ paddingTop: "100px", textAlign: "center" }}>
          Cargando perfil...
        </div>
      </div>
    );
  }

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
              <span>Nivel de mi mascota:</span> {petState}
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
              src={`/${petState}.png`}
              alt="mascota"
            />
          </div>
        </div>

      </div>

    </div>
  );
};

export default Perfil;