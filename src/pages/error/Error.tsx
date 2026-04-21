import React from "react";
import "./Error.css";
import { useNavigate, useLocation } from "react-router-dom";

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
    navigate("/start");
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