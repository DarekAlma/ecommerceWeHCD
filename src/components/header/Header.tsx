import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {

  const navigate = useNavigate();

  return (
    <header className="header">

      {/* LEFT - LOGO */}
      <div 
        className="header__logo"
        onClick={() => navigate("/home")}
        style={{ cursor: "pointer" }}
      >
        BloomMarket
      </div>

      {/* CENTER - NAV */}
      <nav className="header__nav">
        <span 
          className="header__link active"
          onClick={() => navigate("/home")}
        >
          Home
        </span>

        <span 
          className="header__link"
          onClick={() => navigate("/product")}
        >
          Productos
        </span>

        <span className="header__link">
          Mascota
        </span>
      </nav>

      {/* RIGHT - ICONS */}
      <div className="header__icons">
        <img 
          src="/carrito.png" 
          alt="carrito" 
          className="icon-img"
          onClick={() => navigate("/cart")}
        />

        <img 
          src="/persona.png" 
          alt="usuario" 
          className="icon-img"
          onClick={() => navigate("/perfil")}
        />
      </div>

    </header>
  );
};

export default Header;