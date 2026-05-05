import React from "react";
import "./AdminProfile.css";
import HeaderAdmin from "../../components/headeradmin/HeaderAdmin";
import { useNavigate } from "react-router-dom";
import { cerrarSesion } from "../../firebase/auth"; // ✅ IMPORTANTE

const AdminProfile: React.FC = () => {

  const navigate = useNavigate();

  // ✅ FUNCIÓN LOGOUT REAL
  const handleLogout = async () => {
    await cerrarSesion();   // 🔥 CIERRA FIREBASE
    navigate("/login");     // 🔥 REDIRECCIONA
  };

  return (
    <>
      <HeaderAdmin />

      <main className="profile-main-admin">

        <div className="profile-container-admin">

          {/* IZQUIERDA */}
          <div className="profile-info-admin">

            <h1 className="profile-title-admin">BloomMarket</h1>
            <h2 className="profile-subtitle-admin">Mi Perfil</h2>

            <div className="profile-data-admin">
              <p><strong>Usuario:</strong> Admin</p>
              <p><strong>Correo:</strong> admin@bloommarket.com</p>
              <p className="admin-text-admin">Tiene permisos de administrador</p>
            </div>

            <div className="profile-buttons-admin">

              {/* 🔥 ADMIN HOME */}
              <button 
                className="main-btn-admin"
                onClick={() => navigate("/admin/home")}
              >
                Ir a la página principal
              </button>

              {/* 🔥 LOGOUT REAL */}
              <button 
                className="logout-btn"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>

            </div>

          </div>

          {/* DERECHA */}
          <div className="profile-image-admin">
            <img src="/flor.png" alt="perfil" />
          </div>

        </div>

      </main>
    </>
  );
};

export default AdminProfile;