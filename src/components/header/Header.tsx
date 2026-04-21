import React from "react";
import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
          className={`header__link ${location.pathname === "/home" ? "active" : ""}`}
          onClick={() => navigate("/home")}
        >
          Home
        </span>

        <span 
          className={`header__link ${location.pathname === "/product" ? "active" : ""}`}
          onClick={() => navigate("/product")}
        >
          Productos
        </span>

        <span 
          className={`header__link ${location.pathname.startsWith("/survey") ? "active" : ""}`}
          onClick={() => navigate("/survey")}
        >
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