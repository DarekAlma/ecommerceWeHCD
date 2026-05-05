import React, { useState } from "react";
import "./Login.css";
import { iniciarSesion } from "../../firebase/auth";
import { auth } from "../../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";
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

      const user = await iniciarSesion(email, password);

      if (user.email === "admin@bloommarket.com") {
        navigate("/admin/home", { replace: true });
      } else {
        navigate("/start", { replace: true });
      }

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

  const handleForgotPassword = async () => {
    setMensajeError("");

    if (!email) {
      setMensajeError("Escribe tu correo primero");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Revisa tu correo para restablecer tu contraseña");
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        setMensajeError("No existe una cuenta con ese correo");
      } else if (error.code === "auth/invalid-email") {
        setMensajeError("Correo inválido");
      } else {
        setMensajeError("No se pudo enviar el correo");
      }
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
                <p
                  className="forgot"
                  onClick={handleForgotPassword}
                  style={{ cursor: "pointer" }}
                >
                  ¿Olvidaste tu contraseña?
                </p>
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
                <span onClick={() => navigate("/signup")} style={{ cursor: "pointer" }}>
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