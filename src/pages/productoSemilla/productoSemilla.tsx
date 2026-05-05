import React, { useState, useEffect } from "react";
import "./productoSemilla.css";
import Header from "../../components/header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import PresupuestoSelector from "../../components/presupuestoselector/PresupuestoSelector";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

const ProductoSemilla: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const marcaFiltro = location.state?.marca || "";

  const presupuestoInicial =
    location.state?.presupuesto ||
    localStorage.getItem("presupuesto") ||
    "Estándar (900.000 - 1.800.000 COP)";

  const [presupuestoSeleccionado, setPresupuestoSeleccionado] = useState(presupuestoInicial);
  const [celulares, setCelulares] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    getDocs(collection(db, "celulares"))
      .then((snap) => {
        const todos = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        // Filtra por marca si viene una
        const filtrados = todos
          .filter((c: any) => c.visibilidad !== false) // 👈 SOLO VISIBLES
          .filter((c: any) =>
            marcaFiltro
              ? c.marca?.toLowerCase() === marcaFiltro.toLowerCase()
              : true
          );
        setCelulares(filtrados);
      })
      .catch((e) => console.error("Error:", e))
      .finally(() => setCargando(false));
  }, [marcaFiltro]);

  const cambiarPresupuesto = (valor: string) => {
    setPresupuestoSeleccionado(valor);
    localStorage.setItem("presupuesto", valor);
  };

  return (
    <>
      <Header />
      <main className="main-content">
        <div className="hero-banner">
          <div className="hero-content">
            <h1 className="bloom-title">BloomMarket</h1>
            <h2 className="hero-subtitle">Semillero de HCD</h2>
            <p className="hero-description">Si lo deseas, puedes cambiar de presupuesto</p>
            <div className="search-bar">
              <PresupuestoSelector value={presupuestoSeleccionado} onChange={cambiarPresupuesto} />
            </div>
          </div>
          <div className="happy-circle">
            <img src="/semilla.png" alt="Semilla" className="happy-image" />
          </div>
        </div>

        <div className="ps-smartphone-section">
          <h3 className="ps-section-title">
            Smartphones marca {marcaFiltro ? `${marcaFiltro}` : ""}
          </h3>         

          {cargando ? (
            <p style={{ textAlign: "center" }}>Cargando dispositivos...</p>
          ) : celulares.length === 0 ? (
            <p style={{ textAlign: "center" }}>No hay productos disponibles para esta marca.</p>
          ) : (
            <div className="ps-options-grid">
              {celulares.map((celular) => (
                <div className="ps-option-item" key={celular.id}>
                  <div className="ps-option-card">
                    
                    <div className="ps-option-image">
                      {celular.imagen ? (
                        <img
                          src={celular.imagen}
                          alt={`${celular.marca} ${celular.modelo}`}
                          style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        />
                      ) : (
                        <span className="ps-imagen-placeholder">
                          {celular.marca} {celular.modelo}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="ps-option-footer">
                    <div className="ps-option-info">
                      <p className="ps-option-name">{celular.marca} {celular.modelo}</p>
                      <p className="ps-option-price">
                        COP {Number(celular.precio_cop).toLocaleString("es-CO")}
                      </p>
                    </div>
                    <button
                      className="ps-ver-mas"
                        onClick={() => navigate(`/product/${celular.id}`)}                    >
                      Ver más
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="ps-back-container">
          <button className="ps-back-btn" onClick={() => navigate(-1)}>←</button>
        </div>
      </main>
    </>
  );
};

export default ProductoSemilla;