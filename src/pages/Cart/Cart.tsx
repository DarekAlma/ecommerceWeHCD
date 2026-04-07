import React from "react";
import "./Cart.css";
import Header from "../../components/header/Header";

const Cart: React.FC = () => {

  const hasItems = false; // 👈 CAMBIA AQUÍ

  return (
    <>
      <Header />

      <main className="cart-main">

        <div className="cart-container">

          {/* HEADER */}
          <div className="cart-header">
            <h2 className="cart-title">Carrito</h2>
            <p className="cart-balance">Saldo restante: ### COP</p>
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

                {/* ITEM */}
                <div className="cart-row">

                    {/* IZQUIERDA */}
                    <div className="cart-product">
                    <div className="cart-product-image">
                        <img src="/android.png" alt="producto" />
                    </div>

                    <div className="cart-product-info">
                        <p className="cart-product-name">Nombre Dispositivo</p>
                        <span className="cart-remove">Quitar</span>
                    </div>
                    </div>

                    {/* DERECHA */}
                    <div className="cart-price">
                    COP ###
                    </div>

                </div>

                <div className="cart-divider"></div>
                </>
            ) : (
                <p>El carrito se encuentra vacío.</p>
            )}

            </div>

        </div>

        {/* FOOTER */}
        <div className="cart-footer">
          <button className="back-btn">←</button>
          <button className="buy-btn">Comprar</button>
        </div>

      </main>
    </>
  );
};

export default Cart;