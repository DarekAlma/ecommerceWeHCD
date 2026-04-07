import React from "react";
import "./Home.css";
import Header from "../../components/header/Header";

const Home: React.FC = () => {
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

          <div className="happy-circle">
            <img 
              src="/semilla.png" 
              alt="Semilla" 
              className="happy-image"
            />
          </div>
        </div>

{/* Sección Smartphone */}
<div className="smartphone-section">
  <h2 className="section-title">Smartphone</h2>
  <p className="section-subtitle">Selecciona para filtrar tus opciones</p>

  <div className="options-grid">

    <div className="option-item">
      <div className="option-card">
        <div className="option-image">
          <img src="/android.png" alt="Android" className="brand-logo" />
        </div>
      </div>
      <div className="option-footer">
        <p className="option-name">Android</p>
        <a href="#" className="ver-mas">Ver más</a>
      </div>
    </div>

    <div className="option-item">
      <div className="option-card">
        <div className="option-image">
          <img src="/ios.png" alt="iOS" className="brand-logo" />
        </div>
      </div>
      <div className="option-footer">
        <p className="option-name">iPhone</p>
        <a href="#" className="ver-mas">Ver más</a>
      </div>
    </div>

    <div className="option-item">
      <div className="option-card">
        <div className="option-image">
          <img src="/fairphone.png" alt="Modular" className="brand-logo" />
        </div>
      </div>
      <div className="option-footer">
        <p className="option-name">Modular</p>
        <a href="#" className="ver-mas">Ver más</a>
      </div>
    </div>

  </div>
</div>
      </main>
    </>
  );
};

export default Home;