import React, { useState } from "react";
import "./PresupuestoSelector.css";

interface Props {
  value: string;
  onChange: (valor: string) => void;
}

const PresupuestoSelector: React.FC<Props> = ({ value, onChange }) => {
  const [mostrarOpciones, setMostrarOpciones] = useState(false);

  const opciones = [
    "Ahorro (0 - 900.000 COP)",
    "Estándar (900.000 - 1.800.000 COP)",
    "Premium (1.800.000 - 3.000.000 COP)",
    "Alta gama (+ 3.000.000 COP)"
  ];

  return (
    <div className="start_presupuesto">
      <div className="start_select">

        <input
          type="text"
          value={value}
          readOnly
        />

        <button
          className="search-btn"
          onClick={() => setMostrarOpciones(!mostrarOpciones)}
        >
          <img src="/lupa.png" alt="buscar" />
        </button>

      </div>

      {mostrarOpciones && (
        <div className="dropdown-presupuesto">
          {opciones.map((opcion, index) => (
            <div
              className="opcion-presupuesto"
              key={index}
              onClick={() => {
                onChange(opcion);
                setMostrarOpciones(false);
              }}
              style={{
                padding: "12px",
                cursor: "pointer",
                borderBottom:
                  index !== opciones.length - 1
                    ? "1px solid #f0f0f0"
                    : "none"
              }}
            >
              {opcion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PresupuestoSelector;