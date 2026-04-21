// START.tsx

import React, { useState } from "react";
import Header from "../../components/header/Header";
import "./Start.css";
import { useNavigate } from "react-router-dom";
import PresupuestoSelector from "../../components/presupuestoselector/PresupuestoSelector";

const Start: React.FC = () => {
  const navigate = useNavigate();

  const [seleccionado, setSeleccionado] = useState(
    localStorage.getItem("presupuesto") ||
    "Estándar (900.000 - 1.800.000 COP)"
  );

  const handleEmpezar = () => {
    localStorage.setItem("presupuesto", seleccionado);

    navigate("/home", {
      state: {
        presupuesto: seleccionado
      }
    });
  };

  return (
    <div className="start">

      <Header />

      <div className="start_card">

        {/* LEFT */}
        <div className="start_content">

          <h1 className="start_title">BloomMarket</h1>
          <h2 className="start_subtitle">Semillero de HCD</h2>

          <div className="container-text-start">
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

          <PresupuestoSelector
            value={seleccionado}
            onChange={setSeleccionado}
          />

          <button
            className="start_btn"
            onClick={handleEmpezar}
          >
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

export default Start;