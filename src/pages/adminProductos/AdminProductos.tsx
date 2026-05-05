import React, { useEffect, useState } from "react";
import "./AdminProductos.css";
import HeaderAdmin from "../../components/headeradmin/HeaderAdmin";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const AdminProductos: React.FC = () => {

  const [productos, setProductos] = useState<any[]>([]);

  useEffect(() => {
    const ref = collection(db, "celulares");

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const lista: any[] = [];

      snapshot.forEach((docSnap) => {
        lista.push({ id: docSnap.id, ...docSnap.data() });
      });

      setProductos(lista);
    });

    return () => unsubscribe();
  }, []);

  const android = productos.filter(p => p.tipo === "android");
  const ios = productos.filter(p => p.tipo === "ios");
  const modular = productos.filter(p => p.tipo === "modular");

  const toggleVisibilidadProducto = async (id: string, estadoActual: boolean) => {

    // 🔥 actualización inmediata (UX fluido)
    setProductos(prev =>
      prev.map(p =>
        p.id === id ? { ...p, visibilidad: !estadoActual } : p
      )
    );

    try {
      await updateDoc(doc(db, "celulares", id), {
        visibilidad: !estadoActual,
      });
    } catch (error) {
      console.error("Error guardando visibilidad:", error);
    }
  };

  const renderProductos = (lista: any[]) => (
    <div className="options-grid-admin-productos">

      {/* PRODUCTOS */}
      {lista.map((p) => {
        const visible = p.visibilidad ?? true;

        return (
          <div className="option-item-admin-productos" key={p.id}>

            <div
              className={`option-card-admin-productos ${!visible ? "oculto" : ""}`}
              style={{
                filter: visible ? "none" : "brightness(0.6)"
              }}
            >

              <button
                className="toggle-btn-admin-productos"
                onClick={() => toggleVisibilidadProducto(p.id, visible)}
              >
                <img
                  src={visible ? "/visible.png" : "/oculto.png"}
                  alt="toggle"
                  className="icon-toggle-admin-productos"
                />
              </button>

              <div className="option-image-admin-productos">
                <img
                  src={p.imagen}
                  alt={p.modelo}
                  className="brand-logo-admin-productos"
                />
              </div>

            </div>

            <div className="option-footer-admin-productos">
              <div>
                <p className="option-name-admin-productos">{p.modelo}</p>
                <p className="option-price-admin-productos">
                  COP {p.precio_cop?.toLocaleString()}
                </p>
              </div>

              <button className="edit-btn-admin-productos">
                Editar
              </button>
            </div>

          </div>
        );
      })}

      {/* 🔥 CARD AGREGAR (AL MISMO NIVEL) */}
      <div className="option-item-admin-productos">

        <div className="option-card-admin-productos add-card-admin-productos">
          <div className="option-image-admin-productos">
            <img
              src="/celular.png"
              alt="Agregar producto"
              className="brand-logo-admin-productos"
            />
          </div>
        </div>

        <button className="add-btn-admin-productos">
          Agregar producto
        </button>

      </div>

    </div>
  );

  return (
    <div className="admin-productos">

      <HeaderAdmin />

      <main className="admin-productos-main">

        {/* HERO */}
        <div className="admin-productos-hero">
          <div className="admin-productos-hero-content">
            <h1 className="admin-productos-title">BloomMarket</h1>
            <h2 className="admin-productos-subtitle">Semillero de HCD</h2>
          </div>

          <div className="admin-productos-circle">
            <img src="/flor.png" alt="Flor" />
          </div>
        </div>

        {/* SECCIÓN */}
        <div className="admin-productos-section">

          <h2 className="admin-productos-section-title">Smartphones</h2>
          <p className="admin-productos-section-subtitle">
            Lista de todos los productos
          </p>

          <h3 className="titulo-categoria-admin-productos">Android</h3>
          {renderProductos(android)}

          <h3 className="titulo-categoria-admin-productos">iOS</h3>
          {renderProductos(ios)}

          <h3 className="titulo-categoria-admin-productos">Modular</h3>
          {renderProductos(modular)}

        </div>

      </main>
    </div>
  );
};

export default AdminProductos;