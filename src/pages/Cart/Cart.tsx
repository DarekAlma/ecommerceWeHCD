import React, { useEffect, useState } from "react";
import "./Cart.css";
import Header from "../../components/header/Header";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase/config";
import { getAuth } from "firebase/auth"; // 🔥 NUEVO

const Cart: React.FC = () => {

  const navigate = useNavigate();

  // 🔥 NUEVO: carrito dinámico
  const [carrito, setCarrito] = useState<any[]>([]);

  // 🔥 NUEVO: presupuesto
  const presupuesto = localStorage.getItem("presupuesto") || "";

  // 🔥 NUEVO: obtener tope del presupuesto (CORREGIDO)
  const obtenerTope = () => {
      if (presupuesto.includes("Alta gama")) return null; // 🔥 CAMBIO (antes Infinity)
      if (presupuesto.includes("Premium")) return 3000000;
      if (presupuesto.includes("Estándar")) return 1800000;
      if (presupuesto.includes("Ahorro")) return 900000;
    return 0;
  };

  const tope = obtenerTope();

  // 🔥 NUEVO: cargar carrito
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("carrito") || "[]");
    setCarrito(data);
  }, []);

  // 🔥 NUEVO: total gastado
  const total = carrito.reduce((acc, p) => acc + Number(p.precio_cop || 0), 0);

  // 🔥 NUEVO: saldo restante (CORREGIDO)
  const saldoRestante =
    tope === null ? "Infinito" : tope - total;

  const hasItems = carrito.length > 0;

  // 🔥 NUEVO: eliminar producto
  const eliminarProducto = (id: string) => {
    const nuevo = carrito.filter((p) => p.id !== id);
    setCarrito(nuevo);
    localStorage.setItem("carrito", JSON.stringify(nuevo));
  };

  // 🔥 NUEVO: comprar
  const comprar = async () => {
    if (tope !== null && total > tope) { // 🔥 CAMBIO (antes Infinity)
      alert("No puedes comprar, excede tu presupuesto");
      return;
    }

    try {
      // 🔥 USAR AUTH
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        alert("Usuario no identificado");
        return;
      }

      const userId = user.uid;

      const userRef = doc(db, "usuarios", userId);

      // 🔥 GUARDAR COMPRA CON PRESUPUESTO
      await updateDoc(userRef, {
        carrito: arrayUnion(
          ...carrito.map((item) => ({
            ...item,
            tope_presupuesto: tope, // 🔥 NUEVO
            presupuesto_label: presupuesto, // 🔥 NUEVO
            fecha_compra: new Date(), // 🔥 NUEVO
          }))
        ),
      });

      alert("Compra realizada con éxito");

      // limpiar carrito
      localStorage.removeItem("carrito");
      setCarrito([]);

    } catch (error) {
      console.error(error);
      alert("Error al guardar compra");
    }
  };

  return (
    <>
    <div className="contenedor-home">
      <Header />

      <main className="cart-main">

        <div className="cart-container">

          {/* HEADER */}
          <div className="cart-header">
            <h2 className="cart-title">Carrito</h2>
            <p className="cart-balance">
              Saldo restante:{" "}
              {saldoRestante === "Infinito"
                ? "Infinito"
                : `COP ${Number(saldoRestante).toLocaleString("es-CO")}`}
            </p>
          </div>

          {/* CONTENIDO */}
          <div className={`cart-content ${hasItems ? "cart-content--filled" : ""}`}>

            {hasItems ? (
                <>
                {/* HEADER DE TABLA */}
                <div className="cart-table-header">
                    <p>Producto</p>
                    <p>Precio</p>
                </div>

                <div className="cart-divider"></div>

                {/* 🔥 LISTA DINÁMICA */}
                {carrito.map((item) => (
                  <React.Fragment key={item.id}>
                    <div className="cart-row">

                        {/* IZQUIERDA */}
                        <div className="cart-product">
                          <div className="cart-product-image">
                              <img src={item.imagen} alt="producto" />
                          </div>

                          <div className="cart-product-info">
                              <p className="cart-product-name">
                                {item.marca} {item.modelo}
                              </p>
                              <span
                                className="cart-remove"
                                onClick={() => eliminarProducto(item.id)}
                              >
                                Quitar
                              </span>
                          </div>
                        </div>

                        {/* DERECHA */}
                        <div className="cart-price">
                          COP {Number(item.precio_cop).toLocaleString("es-CO")}
                        </div>

                    </div>

                    <div className="cart-divider"></div>
                  </React.Fragment>
                ))}

                </>
            ) : (
                <p>El carrito se encuentra vacío.</p>
            )}

            </div>

        </div>

        {/* FOOTER */}
        <div className="cart-footer">
          <button className="back-btn" onClick={() => navigate(-1)}>←</button>
          <button className="buy-btn" onClick={comprar}>Comprar</button>
        </div>

      </main>
      </div>
    </>
  );
};

export default Cart;