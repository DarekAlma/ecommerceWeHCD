import React from "react";
import "./Login.css";

const Login: React.FC = () => {
  return (

    <body>
    
    <div className="container">

      <div className="card">

        {/* FORMULARIO */}
        <div className="form-section">
          <h1 className="title">BloomMarket</h1>
          <h2 className="subtitle">Registro</h2>

          <div className="input-section">

            <div className="input-group">
              <label htmlFor="email">Correo</label>
              <input 
                id="email"
                type="email" 
                placeholder="Ingresa tu correo" 
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <input 
                id="password"
                type="password" 
                placeholder="Ingresa tu contraseña" 
              />
            </div>

            <div className="input-group">
              <label htmlFor="username">Usuario generado</label>
              <input 
                id="username"
                type="text" 
                placeholder="Usuario" 
              />
            </div>

            <button className="btn">Registrar</button>
          </div>
        </div>

        {/* IMAGEN */}
        <div className="image-section">
          <div className="image-container">
            <img src="/flor.png" alt="flower" />
          </div>
        </div>

      </div>
    </div>
    </body>
  );
};

export default Login;