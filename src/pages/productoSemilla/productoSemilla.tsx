// ProductoSemilla.tsx

import React, { useState } from "react";
import "./ProductoSemilla.css";
import Header from "../../components/header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import PresupuestoSelector from "../../components/presupuestoselector/PresupuestoSelector";

const dispositivos = [
  { id: 1, nombre: "Dispositivo", precio: "COP ###", imagen: "/android.png", alt: "Dispositivo 1" },
  { id: 2, nombre: "Dispositivo", precio: "COP ###", imagen: "/ios.png", alt: "Dispositivo 2" },
  { id: 3, nombre: "Dispositivo", precio: "COP ###", imagen: "/fairphone.png", alt: "Dispositivo 3" },
  { id: 4, nombre: "Dispositivo", precio: "COP ###", imagen: "/android.png", alt: "Dispositivo 4" },
];

const ProductoSemilla: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const presupuestoInicial =
    location.state?.presupuesto ||
    localStorage.getItem("presupuesto") ||
    "Estándar (900.000 - 1.800.000 COP)";

  const [presupuestoSeleccionado, setPresupuestoSeleccionado] =
    useState(presupuestoInicial);

  const cambiarPresupuesto = (valor: string) => {
    setPresupuestoSeleccionado(valor);
    localStorage.setItem("presupuesto", valor);
  };

  return (
    <>
      <Header />

      <main className="ps-main-content">
        {/* Banner principal */}
        <div className="ps-hero-banner">

          <div className="ps-hero-content">
            <h1 className="ps-bloom-title">BloomMarket</h1>
            <h2 className="ps-hero-subtitle">Semillero de HCD</h2>
            
            <p className="ps-hero-description">
              Si lo deseas, puedes cambiar de presupuesto
            </p>
            
            <div className="ps-search-bar">
              <PresupuestoSelector
                value={presupuestoSeleccionado}
                onChange={cambiarPresupuesto}
              />
            </div>
          </div>

          <div className="ps-happy-circle">
            <img src="/semilla.png" alt="Semilla" className="ps-happy-image" />
          </div>
        </div>

        {/* Sección Smartphones */}
        <div className="ps-smartphone-section">
          <h2 className="ps-section-title">Smartphones</h2>
          <p className="ps-section-subtitle">
            De acuerdo con lo seleccionado, escogimos las mejores opciones para ti
          </p>

          <div className="ps-options-grid">
            {dispositivos.map((d) => (
              <div className="ps-option-item" key={d.id}>
                <div className="ps-option-card">
                  <div className="ps-option-image">
                    <span className="ps-imagen-placeholder">Imagen smartphone</span>
                  </div>
                </div>
                <div className="ps-option-footer">
                  <div className="ps-option-info">
                    <p className="ps-option-name">{d.nombre}</p>
                    <p className="ps-option-price">{d.precio}</p>
                  </div>
                  <a href="#" className="ps-ver-mas">Ver más</a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botón volver */}
        <div className="ps-back-container">
          <button className="ps-back-btn" onClick={() => navigate(-1)}>
            ←
          </button>
        </div>
      </main>
    </>
  );
};

export default ProductoSemilla;