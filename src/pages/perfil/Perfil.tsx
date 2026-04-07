import React from "react";
import Header from "../../components/header/Header";
import "./Perfil.css";

const Perfil: React.FC = () => {
  return (
    <div className="start">

      <Header /> {/* 👈 AQUÍ */}

      <div className="start_card">

        {/* LEFT */}
        <div className="start_content">

          <h1 className="start_title">BloomMarket</h1>
          <h2 className="start_subtitle">Mi Perfil</h2>
          <div className = "container-text-start">
            <p>
                El objetivo de este estudio es recolectar información
                para reducir el impacto ambiental de la compra y venta
                de smartphones.
            </p>

            <p>
                En esta plataforma, puedes comprar smartphones
                dependiendo del presupuesto que selecciones.
            </p>

            <p>
                Además, contamos con una mascota.
                Responde unas preguntas y ayúdala a crecer.
            </p>

            <p className="start_label">
                Por favor, selecciona una opción
            </p>
          </div>
          <div className = "start_presupuesto">
            <div className="start_select">
                <input 
                type="text" 
                placeholder="Estándar (900.000 - 1.800.000 COP)" 
                readOnly
                />
                <button className="search-btn">
                    <img src="/lupa.png" alt="buscar" />
                </button>
            </div>
          </div>

          <button className="start_btn">
            Empezar →
        </button>

        </div>

        {/* RIGHT */}
        <div className="image-section-start">
          <div className="image-container-start">
            <img src="/flor.png" alt="flower" />
          </div>
        </div>

      </div>


    </div>
  );
};

export default Perfil;