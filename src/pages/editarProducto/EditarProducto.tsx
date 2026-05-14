import React, { useEffect, useState } from "react";
import "./EditarProducto.css";
import HeaderAdmin from "../../components/headeradmin/HeaderAdmin";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

const EditarProducto: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [celular, setCelular] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  const [modelo, setModelo] = useState("");
  const [precio, setPrecio] = useState("");

  const [caracteristicas, setCaracteristicas] = useState<any[]>([]);

  // 🔥 NUEVO: evita doble ejecución
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (!id) return;

    getDoc(doc(db, "celulares", id))
      .then((snap) => {
        if (snap.exists()) {
          const data = snap.data();
          setCelular({ id: snap.id, ...data });

          setModelo(data.modelo || "");
          setPrecio(data.precio_cop?.toString() || "");
        }
      })
      .catch((e) => console.error("Error:", e))
      .finally(() => setCargando(false));
  }, [id]);

  useEffect(() => {
    getDocs(collection(db, "caracteristicas"))
      .then((snap) => {
        const lista = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setCaracteristicas(lista);
      });
  }, []);

  // 🔥 ACTUALIZAR CAMPO GENÉRICO
  const actualizarCampo = async (campo: string, valor: any) => {
    if (!id || guardando) return;

    const confirmar = window.confirm("¿Guardar cambios?");
    if (!confirmar) return;

    try {
      setGuardando(true);

      await updateDoc(doc(db, "celulares", id), {
        [campo]: valor,
      });

      alert("Cambios guardados ✅");

      // 🔥 sincroniza estado local para evitar futuros falsos cambios
      setCelular((prev: any) => ({
        ...prev,
        [campo]: valor,
      }));
    } catch (error) {
      console.error("Error actualizando:", error);
    } finally {
      setGuardando(false);
    }
  };

  // 🔥 BLUR
  const handleBlurModelo = () => {
    if (guardando) return;

    if (modelo !== celular.modelo) {
      actualizarCampo("modelo", modelo);
    }
  };

  const handleBlurPrecio = () => {
    if (guardando) return;

    if (Number(precio) !== celular.precio_cop) {
      actualizarCampo("precio_cop", Number(precio));
    }
  };

  // 🔥 ENTER
  const handleKeyDownModelo = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 🔥 evita doble trigger
      actualizarCampo("modelo", modelo);
    }
  };

  const handleKeyDownPrecio = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 🔥 clave
      actualizarCampo("precio_cop", Number(precio));
    }
  };

  // 🔥 EDITAR IMAGEN
  const editarImagen = async () => {
    const nuevaImagen = prompt("Ingresa la nueva URL de la imagen:");

    if (!nuevaImagen) return;

    try {
      new URL(nuevaImagen);
    } catch {
      alert("URL inválida");
      return;
    }

    const confirmar = window.confirm("¿Actualizar imagen?");
    if (!confirmar) return;

    try {
      await updateDoc(doc(db, "celulares", id!), {
        imagen: nuevaImagen,
      });

      setCelular({ ...celular, imagen: nuevaImagen });

      alert("Imagen actualizada");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (cargando) return <p style={{ textAlign: "center" }}>Cargando...</p>;
  if (!celular) return <p>No encontrado</p>;

  return (
    <div className="editar-producto">
      <HeaderAdmin />

      <main className="editar-main">

        <div className="editar-container">

          {/* IZQUIERDA */}
          <div className="editar-image-section">

            <div className="editar-image-box">
              {celular.imagen ? (
                <img src={celular.imagen} alt="producto" />
              ) : (
                <p>Imagen smartphone</p>
              )}
            </div>

          </div>

          {/* DERECHA */}
          <div className="editar-info-section">

            <input
              className="editar-titulo"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              onBlur={handleBlurModelo}
              onKeyDown={handleKeyDownModelo}
            />

            <input
              className="editar-precio"
              value={precio}
              onChange={(e) =>
                setPrecio(e.target.value.replace(/[^0-9]/g, ""))
              }
              onBlur={handleBlurPrecio}
              onKeyDown={handleKeyDownPrecio}
            />

            <button className="editar-btn-negro" onClick={editarImagen}>
              Editar imagen
            </button>

            <button
              className="editar-btn-verde"
              onClick={() => navigate(`/admin/product/${id}/features`)}
            >
              Editar o agregar características
            </button>

            <button className="editar-btn-back" onClick={() => navigate(-1)}>
              ←
            </button>

          </div>

        </div>

        {/* 🔥 CARACTERÍSTICAS */}
        <div className="features-section-edit">

          <h3 className="features-title">Características principales</h3>

          <div className="features-grid">

            <div className="features-column">
              <p className="features-subtitle">Características técnicas</p>

              <ul>
                {caracteristicas
                  .filter((c: any) => c.tipo === "tecnica")
                  .map((c: any) => {
                    const valor = celular[c.clave];
                    if (!valor) return null;

                    return (
                      <li key={c.id}>
                        {c.etiqueta}: {valor}
                      </li>
                    );
                  })}
              </ul>
            </div>

            <div className="divider-edit"></div>

            <div className="features-column">
              <p className="features-subtitle">
                Características ambientales
              </p>

              <ul>
                {caracteristicas
                  .filter((c: any) => c.tipo === "ambiental")
                  .map((c: any) => {
                    const valor = celular[c.clave];
                    if (!valor) return null;

                    return (
                      <li key={c.id}>
                        {c.etiqueta}: {valor}
                      </li>
                    );
                  })}
              </ul>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
};

export default EditarProducto;