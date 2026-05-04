// HOME.tsx

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Home.css";
import Header from "../../components/header/Header";
import PresupuestoSelector from "../../components/presupuestoselector/PresupuestoSelector";
import { useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";

const Home: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const irAProductos = (marca: string) => {
    navigate("/productosemilla", { state: { marca } });
  };

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

  const [visibilidad, setVisibilidad] = useState({
    android: true,
    ios: true,
    modular: true,
  });

  useEffect(() => {
  const docRef = doc(db, "configuracion", "visibilidad");

  const unsubscribe = onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      setVisibilidad(docSnap.data() as any);
    }
  });

  return () => unsubscribe();
}, []);

  return (
    <>
      <Header />

      <main className="main-content">
        {/* Banner principal */}
        <div className="hero-banner">
          <div className="hero-content">
            <h1 className="bloom-title">BloomMarket</h1>
            <h2 className="hero-subtitle">Semillero de HCD</h2>
            <p className="hero-description">
              Si lo deseas, puedes cambiar de presupuesto
            </p>
            <div className="search-bar">
              <PresupuestoSelector
                value={presupuestoSeleccionado}
                onChange={cambiarPresupuesto}
              />
            </div>
          </div>

          <div className="happy-circle">
            <img src="/semilla.png" alt="Semilla" className="happy-image" />
          </div>
        </div>

        {/* Sección Smartphone */}
        <div className="smartphone-section">
          <h3 className="section-title">Selecciona el tipo que deseas</h3>
          
          <div className="options-grid">

            {/* Android → Samsung */}
            {visibilidad.android && (
            <div className="option-item">
              <div className="option-card">
                <div className="option-image">
                  <img src="/android.png" alt="Android" className="brand-logo" />
                </div>
              </div>
              <div className="option-footer">
                <p className="option-name">Android</p>
                <a
                  href="#"
                  className="ver-mas"
                  onClick={(e) => {
                    e.preventDefault();
                    irAProductos("Samsung");
                  }}
                >
                  Ver más
                </a>
              </div>
            </div>
            )}

            {/* iPhone → Apple */}
            {visibilidad.ios && (
            <div className="option-item">
              <div className="option-card">
                <div className="option-image">
                  <img src="/ios.png" alt="iOS" className="brand-logo" />
                </div>
              </div>
              <div className="option-footer">
                <p className="option-name">iPhone</p>
                <a
                  href="#"
                  className="ver-mas"
                  onClick={(e) => {
                    e.preventDefault();
                    irAProductos("Apple");
                  }}
                >
                  Ver más
                </a>
              </div>
            </div>
            )}

            {/* Modular */}
            {visibilidad.modular && (
            <div className="option-item">
              <div className="option-card">
                <div className="option-image">
                  <img src="/fairphone.png" alt="Modular" className="brand-logo" />
                </div>
              </div>
              <div className="option-footer">
                <p className="option-name">Modular</p>
                <a
                  href="#"
                  className="ver-mas"
                  onClick={(e) => {
                    e.preventDefault();
                    irAProductos("Modular");
                  }}
                >
                  Ver más
                </a>
              </div>
            </div>
            )}

          </div>
        </div>
      </main>
    </>
  );
};

export default Home;