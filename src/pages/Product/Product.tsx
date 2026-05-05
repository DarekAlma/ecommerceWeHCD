import React, { useEffect, useState } from "react";
import "./Product.css";
import Header from "../../components/header/Header";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [celular, setCelular] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  // 🔥 NUEVO: características dinámicas
  const [caracteristicas, setCaracteristicas] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;

    getDoc(doc(db, "celulares", id))
      .then((snap) => {
        if (snap.exists()) setCelular({ id: snap.id, ...snap.data() });
      })
      .catch((e) => console.error("Error:", e))
      .finally(() => setCargando(false));
  }, [id]);

  // 🔥 NUEVO: traer características desde Firebase
  useEffect(() => {
    getDocs(collection(db, "caracteristicas"))
      .then((snap) => {
        const lista = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setCaracteristicas(lista);
      })
      .catch((e) => console.error("Error cargando características:", e));
  }, []);

  // 🔥 NUEVO: AGREGAR AL CARRITO
  const agregarAlCarrito = () => {
    if (!celular) return;

    const carritoActual = JSON.parse(localStorage.getItem("carrito") || "[]");

    // evitar duplicados
    const existe = carritoActual.some((p: any) => p.id === celular.id);

    if (existe) {
      alert("Este producto ya está en el carrito");
      return;
    }

    const nuevoCarrito = [...carritoActual, celular];

    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));

    alert("Producto agregado al carrito");
    navigate("/cart");
  };

  if (cargando)
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Cargando...</p>;

  if (!celular)
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        Producto no encontrado.
      </p>
    );

  return (
    <>
      <Header />

      <main className="product-main">
        {/* CONTENIDO PRINCIPAL */}
        <div className="product-container">
          {/* IMAGEN */}
          <div className="product-image-section">
            <div className="image-box">
              {celular.imagen ? (
                <img
                  src={celular.imagen}
                  alt={`${celular.marca} ${celular.modelo}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <p>
                  {celular.marca} {celular.modelo}
                </p>
              )}

              <div className="image-dots">
                <span className="dot active"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          </div>

          {/* INFO */}
          <div className="product-info-section">
            <h2 className="product-name">
              {celular.marca} {celular.modelo}
            </h2>

            <p className="product-price">
              COP {Number(celular.precio_cop).toLocaleString("es-CO")}
            </p>

            <p className="product-description">
              {celular.pantalla} · {celular.almacenamiento_base} · {celular.os}
            </p>

            {/* 🔥 MODIFICADO */}
            <button className="add-btn" onClick={agregarAlCarrito}>
              Agregar al carrito
            </button>

            <button className="back-btn" onClick={() => navigate(-1)}>
              ←
            </button>
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
                {caracteristicas
                  .filter((c: any) => c.tipo === "tecnica")
                  .map((c: any) => {
                    const valor = celular[c.clave];
                    if (!valor) return null;

                    return (
                      <li key={c.id}>
                        {c.etiqueta}: {valor}
                      </li>
                    );
                  })}
              </ul>
            </div>

            {/* DIVISOR */}
            <div className="divider"></div>

            {/* DERECHA */}
            <div className="features-column">
              <p className="features-subtitle">
                Características ambientales
              </p>

              <ul>
                {caracteristicas
                  .filter((c: any) => c.tipo === "ambiental")
                  .map((c: any) => {
                    const valor = celular[c.clave];
                    if (!valor) return null;

                    return (
                      <li key={c.id}>
                        {c.etiqueta}: {valor}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Product;