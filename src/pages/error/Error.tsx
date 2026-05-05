import React from "react";
import "./Error.css";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../firebase/config";

const Error: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const codigoError =
    location.state?.codigo ||
    "404";

  const mensajeError =
    codigoError === "404"
      ? "Not Found"
      : codigoError === "403"
      ? "Forbidden"
      : codigoError === "500"
      ? "Internal Server Error"
      : "Ha ocurrido un error";

  const handleInicio = () => {
    const user = auth.currentUser;

    if (!user) {
      navigate("/login");
      return;
    }

    if (user.email === "admin@bloommarket.com") {
      navigate("/admin/home"); // ✅ ADMIN
    } else {
      navigate("/home"); // ✅ USER
    }
  };

  return (
    <div className="container-error">
      <div className="card-error">

        {/* FORMULARIO */}
        <div className="form-section-error">
          <h1 className="title-error">BloomMarket</h1>
          <h2 className="subtitle-error">Error {codigoError}</h2>

              <p
                className="mensaje-error"
                style={{ cursor: "default" }}
              >
                {mensajeError}
              </p>
    

            <button
              className="btn-pagina-principal"
              onClick={handleInicio}
            >
              Ir a la página principal
            </button>
        </div>

        {/* IMAGEN */}
        <div className="image-section-error">
          <div className="image-container-error">
            <img src="/flor.png" alt="flower" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Error;