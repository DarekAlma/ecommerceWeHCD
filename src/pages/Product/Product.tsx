import React from "react";
import "./Product.css";
import Header from "../../components/header/Header";

const Product: React.FC = () => {
  return (
    <>
      <Header />

      <main className="product-main">

        {/* CONTENIDO PRINCIPAL */}
        <div className="product-container">

          {/* IMAGEN */}
          <div className="product-image-section">
            <div className="image-box">
              <p>Imagen smartphone</p>

              <div className="image-dots">
                <span className="dot active"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          </div>

          {/* INFO */}
          <div className="product-info-section">
            <h2 className="product-name">Nombre Dispositivo</h2>
            <p className="product-price">COP ###</p>
            <p className="product-description">Descripción</p>

            <button className="add-btn">Agregar al carrito</button>

            <button className="back-btn">←</button>
          </div>

        </div>

        {/* CARACTERÍSTICAS */}
        <div className="features-section">
          <h3 className="features-title">Características principales</h3>

          <div className="features-grid">

            {/* IZQUIERDA */}
            <div className="features-column">
              <p className="features-subtitle">Características técnicas</p>

              <ul>
                <li>Medidas (Ancho x Alto x Fondo): 71,5 x 42,2 x 7,5 cm</li>
                <li>Puertos HDMI: 2</li>
                <li>Tipo de Pantalla: QLED-QNED</li>
                <li>Resolución de Pantalla: FHD</li>
                <li>Tamaño de Pantalla: 32 pulgadas</li>
              </ul>
            </div>

            {/* DIVISOR */}
            <div className="divider"></div>

            {/* DERECHA */}
            <div className="features-column">
              <p className="features-subtitle">Características ambientales</p>

              <ul>
                <li>Garantía: 2 años</li>
                <li>Vida esperada: 8-10 años</li>
                <li>Facilidad de reparación: Media-Alta (70%)</li>
                <li>Probabilidad de reciclaje: 85%</li>
                <li>Huella de carbono: 120 kg CO₂e</li>
              </ul>
            </div>

          </div>
        </div>

      </main>
    </>
  );
};

export default Product;