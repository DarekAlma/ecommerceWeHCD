import React, { useEffect, useState } from "react";
import "./AdminProductFeatures.css";
import HeaderAdmin from "../../components/headeradmin/HeaderAdmin";

import { useNavigate, useParams } from "react-router-dom";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "../../firebase/config";

const AdminProductFeatures: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [celular, setCelular] = useState<any>(null);

  const [caracteristicas, setCaracteristicas] = useState<any[]>([]);

  const [tipo, setTipo] = useState("tecnica");
  const [etiqueta, setEtiqueta] = useState("");
  const [clave, setClave] = useState("");
  const [valor, setValor] = useState("");

  // 🔥 cargar celular
  useEffect(() => {
    if (!id) return;

    getDoc(doc(db, "celulares", id)).then((snap) => {
      if (snap.exists()) {
        setCelular({
          id: snap.id,
          ...snap.data(),
        });
      }
    });
  }, [id]);

  // 🔥 cargar características
  useEffect(() => {
    getDocs(collection(db, "caracteristicas")).then((snap) => {
      const lista = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setCaracteristicas(lista);
    });
  }, []);

  // 🔥 CREAR característica
  const crearCaracteristica = async () => {
    if (!etiqueta || !clave || !valor) {
      alert("Completa todos los campos");
      return;
    }

    try {
      // 1️⃣ crear metadata si no existe
      const existe = caracteristicas.find((c) => c.clave === clave);

      if (!existe) {
        await addDoc(collection(db, "caracteristicas"), {
          etiqueta,
          clave,
          tipo,
        });
      }

      // 2️⃣ guardar valor en celular
      await updateDoc(doc(db, "celulares", id!), {
        [clave]: valor,
      });

      alert("Característica agregada ✅");

      window.location.reload();

    } catch (error) {
      console.error(error);
    }
  };

  // 🔥 BORRAR
  const borrarCaracteristicas = async () => {
    const seleccionadas = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );

    if (seleccionadas.length === 0) {
      alert("Selecciona características");
      return;
    }

    const confirmar = window.confirm(
      "¿Seguro que deseas borrar las características?"
    );

    if (!confirmar) return;

    try {
      const updates: any = {};

      seleccionadas.forEach((checkbox: any) => {
        const clave = checkbox.value;
        updates[clave] = null;
      });

      await updateDoc(doc(db, "celulares", id!), updates);

      alert("Características eliminadas");

      window.location.reload();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <HeaderAdmin />

      <main className="admin-product-main">

        <div className="admin-product-container">

          {/* IZQUIERDA */}
          <div className="features-list-section">

            <h2 className="features-main-title">
              Listado de características
            </h2>

            {/* TECNICAS */}
            <div className="feature-group">

              <h3 className="feature-group-title">
                Características técnicas
              </h3>

              {caracteristicas
                .filter((c: any) => c.tipo === "tecnica")
                .map((c: any) => {
                  const valorCel = celular?.[c.clave];

                  if (!valorCel) return null;

                  return (
                    <label className="feature-item" key={c.id}>
                      <input type="checkbox" value={c.clave} />

                      <span>
                        {c.etiqueta}: {valorCel}
                      </span>
                    </label>
                  );
                })}
            </div>

            {/* AMBIENTALES */}
            <div className="feature-group">

              <h3 className="feature-group-title">
                Características ambientales
              </h3>

              {caracteristicas
                .filter((c: any) => c.tipo === "ambiental")
                .map((c: any) => {
                  const valorCel = celular?.[c.clave];

                  if (!valorCel) return null;

                  return (
                    <label className="feature-item" key={c.id}>
                      <input type="checkbox" value={c.clave} />

                      <span>
                        {c.etiqueta}: {valorCel}
                      </span>
                    </label>
                  );
                })}
            </div>

            <button
              className="delete-btn"
              onClick={borrarCaracteristicas}
            >
              Borrar
            </button>

            <button
              className="back-btn"
              onClick={() => navigate(-1)}
            >
              ←
            </button>

          </div>

          {/* DERECHA */}
          <div className="new-feature-card">

            <h2 className="new-feature-title">
              Nueva característica
            </h2>

            {/* TIPO */}
            <div className="input-group">
              <label>Tipo</label>

              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              >
                <option value="tecnica">
                  Técnica
                </option>

                <option value="ambiental">
                  Ambiental
                </option>
              </select>
            </div>

            {/* ETIQUETA */}
            <div className="input-group">
              <label>Etiqueta</label>

              <input
                type="text"
                placeholder="Ingresa la etiqueta"
                value={etiqueta}
                onChange={(e) => setEtiqueta(e.target.value)}
              />
            </div>

            {/* CLAVE */}
            <div className="input-group">
              <label>Clave</label>

              <input
                type="text"
                placeholder="Ej: garantia"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
              />
            </div>

            {/* VALOR */}
            <div className="input-group">
              <label>Valor</label>

              <input
                type="text"
                placeholder="Ingresa el valor"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
            </div>

            <button
              className="create-btn"
              onClick={crearCaracteristica}
            >
              Crear
            </button>

          </div>

        </div>

      </main>
    </>
  );
};

export default AdminProductFeatures;