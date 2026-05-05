import React from "react";
import "./HeaderAdmin.css";
import { useNavigate, useLocation } from "react-router-dom";

const HeaderAdmin: React.FC = () => {

  const navigate = useNavigate();
  const location = useLocation(); // 👈 CLAVE

  return (
    <header className="header-admin">

      {/* LEFT - LOGO */}
      <div 
        className="header__logo-admin"
        onClick={() => navigate("/admin/home")}
        style={{ cursor: "pointer" }}
      >
        BloomMarket
      </div>

      {/* CENTER - NAV */}
      <nav className="header__nav-admin">

        <span 
          className={`header__link-admin ${
            location.pathname === "/admin/home" ? "active" : ""
          }`}
          onClick={() => navigate("/admin/home")}
        >
          Home
        </span>

        <span 
          className={`header__link-admin ${
            location.pathname === "/admin/productos" ? "active" : ""
          }`}
          onClick={() => navigate("/admin/productos")}
        >
          Productos
        </span>

      </nav>

      {/* RIGHT - ICONS */}
      <div className="header__icons-admin">
        <img 
          src="/persona.png" 
          alt="usuario" 
          className="icon-img-admin"
          onClick={() => navigate("/admin/profile")}
        />
      </div>

    </header>
  );
};

export default HeaderAdmin;