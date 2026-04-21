import React from "react";
import "./AdminProfile.css";
import Header from "../../components/header/Header";
import { useNavigate } from "react-router-dom";

const AdminProfile: React.FC = () => {

  const navigate = useNavigate();

  return (
    <>
      <Header />

      <main className="profile-main">

        <div className="profile-container">

          {/* IZQUIERDA */}
          <div className="profile-info">

            <h1 className="profile-title">BloomMarket</h1>
            <h2 className="profile-subtitle">Mi Perfil</h2>

            <div className="profile-data">
              <p><strong>Usuario:</strong> Admin</p>
              <p><strong>Correo:</strong> admin@gmail.com</p>
              <p><strong>Nivel de mi mascota:</strong> 4</p>
              <p className="admin-text">Tiene permisos de administrador</p>
            </div>

            <div className="profile-buttons">
              <button 
                className="main-btn"
                onClick={() => navigate("/home")}
              >
                Ir a la página principal
              </button>

              <button 
                className="logout-btn"
                onClick={() => navigate("/login")}
              >
                Cerrar sesión
              </button>
            </div>

          </div>

          {/* DERECHA */}
          <div className="profile-image">
            <img src="/flor.png" alt="perfil" />
          </div>

        </div>

      </main>
    </>
  );
};

export default AdminProfile;