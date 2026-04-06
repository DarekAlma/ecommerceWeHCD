import React from "react";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">

      {/* LEFT - LOGO */}
      <div className="header__logo">
        BloomMarket
      </div>

      {/* CENTER - NAV */}
      <nav className="header__nav">
        <a href="#" className="header__link active">Home</a>
        <a href="#" className="header__link">Productos</a>
        <a href="#" className="header__link">Mascota</a>
      </nav>

      {/* RIGHT - ICONS */}
      <div className="header__icons">
        <img src="/carrito.png" alt="carrito" className="icon-img" />
        <img src="/persona.png" alt="usuario" className="icon-img" />
      </div>

    </header>
  );
};

export default Header;