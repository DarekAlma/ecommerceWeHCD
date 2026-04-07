import React from "react";
import "./Login.css";

const Login: React.FC = () => {
  return (

    <body>
    
    <div className="container-login">

      <div className="card-login">

        {/* FORMULARIO */}
        <div className="form-section-login">
          <h1 className="title-login">BloomMarket</h1>
          <h2 className="subtitle-login">Log In</h2>

          <div className="input-section-login">

            <div className="input-group-login">
              <label htmlFor="email">Correo</label>
              <input 
                id="email"
                type="email" 
                placeholder="Ingresa tu correo" 
              />
            </div>

            <div className="input-group-login">
              <label htmlFor="password">Contraseña</label>
              <input 
                id="password"
                type="password" 
                placeholder="Ingresa tu contraseña" 
              />
            </div>

            <div className="container-forgot">
              <div className = "container-mini-forgot">
              <p className="forgot">
                ¿Olvidaste tu contraseña?
              </p>
              </div>

              <button className="btn-ingresar">Ingresar</button>

              <p className="signup-text">
                ¿No tienes cuenta? <br/> <span>Regístrate aquí</span>
              </p>

            </div>
          </div>
        </div>

        {/* IMAGEN */}
        <div className="image-section-login">
          <div className="image-container-login">
            <img src="/flor.png" alt="flower" />
          </div>
        </div>

      </div>
    </div>
    </body>
  );
};

export default Login;