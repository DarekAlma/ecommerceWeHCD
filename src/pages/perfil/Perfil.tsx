import React from "react";
import Header from "../../components/header/Header";
import "./Perfil.css";

const Perfil: React.FC = () => {
  return (
    <div className="perfil">

      <Header /> {/* 👈 AQUÍ */}

      <div className="perfil_card">

        {/* LEFT */}
        <div className="perfil_content">

          <h1 className="perfil_title">BloomMarket</h1>
          <h2 className="perfil_subtitle">Mi Perfil</h2>
          <div className = "container-text-perfil">
            <p>
                <span>Usuario:</span> Usuario
            </p>

            <p>
                <span>Correo:</span> ejemplo@gmail.com
            </p>

            <p>
                <span>Nivel de mi mascota:</span> 4
            </p>

          </div>
        
        <div className = "botones-perfil">
            <button className="btn-pag-principal">Ir a la página principal</button>
            <button className="btn-cerrar">Cerrar sesión</button>
        </div>

        </div>

        {/* RIGHT */}
        <div className="image-section-perfil">
          <div className="image-container-perfil">
            <img src="/flor.png" alt="flower" />
          </div>
        </div>

      </div>


    </div>
  );
};

export default Perfil;