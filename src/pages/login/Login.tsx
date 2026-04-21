import React, { useState } from "react";
import "./Login.css";
import { iniciarSesion } from "../../firebase/auth"; // ajusta ruta si cambia
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setMensajeError("");

    if (!email || !password) {
      setMensajeError("Completa todos los campos");
      return;
    }

    try {
      setLoading(true);

      await iniciarSesion(email, password);

      navigate("/start"); // cambia la ruta si quieres otra página
    } catch (error: any) {
      console.error(error);

      if (error.code === "auth/invalid-credential") {
        setMensajeError("Correo o contraseña incorrectos");
      } else if (error.code === "auth/user-not-found") {
        setMensajeError("Usuario no encontrado");
      } else if (error.code === "auth/wrong-password") {
        setMensajeError("Contraseña incorrecta");
      } else {
        setMensajeError("Error al iniciar sesión");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group-login">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="container-forgot">
              <div className="container-mini-forgot">
                <p className="forgot">¿Olvidaste tu contraseña?</p>
              </div>

              {mensajeError && (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {mensajeError}
                </p>
              )}

              <button
                className="btn-ingresar"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Ingresando..." : "Ingresar"}
              </button>

              <p className="signup-text">
                ¿No tienes cuenta? <br />
                <span onClick={() => navigate("/registro")}>
                  Regístrate aquí
                </span>
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
  );
};

export default Login;