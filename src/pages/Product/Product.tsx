import React, { useEffect, useState } from "react";
import "./Product.css";
import Header from "../../components/header/Header";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [celular, setCelular] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!id) return;
    getDoc(doc(db, "celulares", id))
      .then((snap) => {
        if (snap.exists()) setCelular({ id: snap.id, ...snap.data() });
      })
      .catch((e) => console.error("Error:", e))
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando) return <p style={{ textAlign: "center", marginTop: "2rem" }}>Cargando...</p>;
  if (!celular) return <p style={{ textAlign: "center", marginTop: "2rem" }}>Producto no encontrado.</p>;

  return (
    <>
      <Header />

      <main className="product-main">

        {/* CONTENIDO PRINCIPAL */}
        <div className="product-container">

          {/* IMAGEN */}
          <div className="product-image-section">
            <div className="image-box">
              <p>{celular.marca} {celular.modelo}</p>
              <div className="image-dots">
                <span className="dot active"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          </div>

          {/* INFO */}
          <div className="product-info-section">
            <h2 className="product-name">{celular.marca} {celular.modelo}</h2>
            <p className="product-price">
              COP {Number(celular.precio_cop).toLocaleString("es-CO")}
            </p>
            <p className="product-description">
              {celular.pantalla} · {celular.almacenamiento_base} · {celular.os}
            </p>

            <button className="add-btn">Agregar al carrito</button>
            <button className="back-btn" onClick={() => navigate(-1)}>←</button>
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
                <li>Modelo: {celular.modelo}</li>
                <li>Año: {celular.año}</li>
                <li>Pantalla: {celular.pantalla}</li>
                <li>Almacenamiento: {celular.almacenamiento_base}</li>
                <li>Sistema operativo: {celular.os}</li>
                <li>Peso: {celular.peso_g} g</li>
                <li>Resistencia: {celular.resistencia}</li>
              </ul>
            </div>

            {/* DIVISOR */}
            <div className="divider"></div>

            {/* DERECHA */}
            <div className="features-column">
              <p className="features-subtitle">Características ambientales</p>
              <ul>
                <li>Huella de carbono: {celular.huella_co2e_kg} kg CO₂e</li>
                <li>Materiales: {celular.materiales_ambientales}</li>
              </ul>
            </div>

          </div>
        </div>

      </main>
    </>
  );
};

export default Product;