import React, { useState, useEffect } from "react";
import "./Signup.css";
import { registrarUsuario } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const generarUsuario = async () => {
      try {
        const snapshot = await getDocs(collection(db, "usuarios"));
        const total = snapshot.size + 1;

        const numero = total.toString().padStart(2, "0");
        setUsername(`Usuario${numero}`);
      } catch (error) {
        setUsername("Usuario01");
      }
    };

    generarUsuario();
  }, []);

  const handleSignup = async () => {
    setMensajeError("");

    if (!email || !password || !username) {
      setMensajeError("Completa todos los campos");
      return;
    }

    try {
      setLoading(true);

      await registrarUsuario(email, password, username);

      navigate("/start");
    } catch (error: any) {
      console.error(error);

      if (error.code === "auth/email-already-in-use") {
        setMensajeError("Ese correo ya está registrado");
      } else if (error.code === "auth/weak-password") {
        setMensajeError("La contraseña debe tener al menos 6 caracteres");
      } else {
        setMensajeError("Error al registrar usuario");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="username">Número de usuario</label>
              <input
                id="username"
                type="text"
                placeholder="Usuario"
                value={username}
                readOnly
              />
            </div>

            {mensajeError && (
              <p style={{ color: "red", fontSize: "14px" }}>
                {mensajeError}
              </p>
            )}

            <button
              className="btn"
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrar"}
            </button>

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
  );
};

export default Signup;