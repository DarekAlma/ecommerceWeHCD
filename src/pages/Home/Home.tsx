import React from "react";
import "./Home.css";
import Header from "../../components/header/Header";

const Home: React.FC = () => {
  return (
    <>
      <Header />

      <div className="bloom-container">
        
        {/* Banner principal - Semillero de HCD */}
        <div className="hero-banner">
          <div className="hero-content">
            <h1 className="bloom-title">BloomMarket</h1>
            <h2 className="hero-subtitle">Semillero de HCD</h2>
            <p className="hero-description">
              Si lo deseas, puedes cambiar de presupuesto
            </p>

            <div className="search-bar">
              <input 
                type="text" 
                placeholder="Estándar (900.000 - 1.800.000 COP)" 
                className="search-input"
              />
              <button className="search-button">
                🔍
              </button>
            </div>
          </div>

          {/* Círculo feliz (el huevito) - tú pondrás la imagen después */}
          <div className="happy-circle">
            <img 
              src="/happy-egg.png" 
              alt="Happy character" 
              className="happy-image"
            />
          </div>
        </div>

        {/* Sección de Smartphone */}
        <div className="smartphone-section">
          <h2 className="section-title">Smartphone</h2>
          <p className="section-subtitle">Selecciona para filtrar tus opciones</p>

          <div className="options-grid">
            
            {/* Opción Android */}
            <div className="option-card">
              <div className="option-image">
                <img 
                  src="/android-logo.png" 
                  alt="Android" 
                  className="brand-logo"
                />
              </div>
              <p className="option-name">Android</p>
              <a href="#" className="ver-mas">Ver más</a>
            </div>

            {/* Opción iOS */}
            <div className="option-card">
              <div className="option-image">
                <img 
                  src="/ios-logo.png" 
                  alt="iOS" 
                  className="brand-logo"
                />
              </div>
              <p className="option-name">iPhone</p>
              <a href="#" className="ver-mas">Ver más</a>
            </div>

            {/* Opción Modular */}
            <div className="option-card">
              <div className="option-image">
                <img 
                  src="/modular-phone.png" 
                  alt="Modular" 
                  className="brand-logo"
                />
              </div>
              <p className="option-name">Modular</p>
              <a href="#" className="ver-mas">Ver más</a>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Home;