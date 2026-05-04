import React, { useState } from "react";
import "./AdminHome.css";
import HeaderAdmin from "../../components/headeradmin/HeaderAdmin";

const AdminHome: React.FC = () => {

  // ✅ ESTADO (AGREGADO)
  const [visibilidad, setVisibilidad] = useState({
    android: true,
    ios: true,
    modular: true,
  });

  // ✅ TOGGLE (AGREGADO)
  const toggleVisibilidad = (key: "android" | "ios" | "modular") => {
    setVisibilidad((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      <div className="contenedor-admin-home">
        <HeaderAdmin />

        <main className="main-content-admin">

          <div className="hero-banner-admin">
            <div className="hero-content-admin">
              <h1 className="bloom-title-admin">BloomMarket</h1>
              <h2 className="hero-subtitle-admin">Semillero de HCD</h2>
            </div>

            <div className="happy-circle-admin">
              <img src="/flor.png" alt="Flor" className="happy-image-admin" />
            </div>
          </div>

          <div className="smartphone-section-admin">
            <h2 className="section-title-admin">Smartphones</h2>

            <p className="section-subtitle-admin">
              Filtra las opciones visibles a los clientes
            </p>

            <div className="options-grid-admin">

              {/* ANDROID */}
              <div className="option-item-admin">
                <div
                  className="option-card-admin"
                  style={{
                    filter: visibilidad.android ? "none" : "brightness(0.6)"
                  }}
                >

                  <button
                    className="toggle-btn"
                    onClick={() => toggleVisibilidad("android")}
                  >
                    <img
                      src={
                        visibilidad.android
                          ? "/visible.png"   // 👁️ TU ICONO
                          : "/oculto.png"    // 🚫 TU ICONO
                      }
                      alt="toggle"
                      className="icon-toggle"
                    />
                  </button>

                  <div className="option-image-admin">
                    <img src="/android.png" alt="Android" className="brand-logo-admin" />
                  </div>
                </div>

                <div className="option-footer-admin">
                  <p className="option-name-admin">Android</p>
                </div>
              </div>

              {/* IOS */}
              <div className="option-item-admin">
                <div
                  className="option-card-admin"
                  style={{ filter: visibilidad.ios ? "none" : "brightness(0.6)" }}
                >

                  <button
                    className="toggle-btn"
                    onClick={() => toggleVisibilidad("ios")}
                  >
                    <img
                      src={
                        visibilidad.ios
                          ? "/visible.png"
                          : "/oculto.png"
                      }
                      alt="toggle"
                      className="icon-toggle"
                    />
                  </button>

                  <div className="option-image-admin">
                    <img src="/ios.png" alt="iOS" className="brand-logo-admin" />
                  </div>
                </div>

                <div className="option-footer-admin">
                  <p className="option-name-admin">iPhone</p>
                </div>
              </div>

              {/* MODULAR */}
              <div className="option-item-admin">
                <div
                  className="option-card-admin"
                  style={{ filter: visibilidad.modular ? "none" : "brightness(0.6)" }}
                >

                  <button
                    className="toggle-btn"
                    onClick={() => toggleVisibilidad("modular")}
                  >
                    <img
                      src={
                        visibilidad.modular
                          ? "/visible.png"
                          : "/oculto.png"
                      }
                      alt="toggle"
                      className="icon-toggle"
                    />
                  </button>

                  <div className="option-image-admin">
                    <img src="/fairphone.png" alt="Modular" className="brand-logo-admin" />
                  </div>
                </div>

                <div className="option-footer-admin">
                  <p className="option-name-admin">Modular</p>
                </div>
              </div>

            </div>
          </div>

        </main>
      </div>
    </>
  );
};

export default AdminHome;