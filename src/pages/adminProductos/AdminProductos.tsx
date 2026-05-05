import React, { useEffect, useState } from "react";
import "./AdminProductos.css";
import HeaderAdmin from "../../components/headeradmin/HeaderAdmin";
import { collection, onSnapshot, doc, updateDoc, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const AdminProductos: React.FC = () => {

  const [productos, setProductos] = useState<any[]>([]);

  // 🔥 MODAL + FORM
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tipoSeleccionado, setTipoSeleccionado] = useState<string | null>(null);

  const [form, setForm] = useState({
    marca: "",
    modelo: "",
    precio_cop: "",
    imagen: "",
    pantalla: "",
    almacenamiento_base: "",
    os: "",
    peso_g: "",
    resistencia: "",
    año: "",
    huella_co2e_kg: "",
    materiales_ambientales: "",
  });

  // 🔥 NUEVO: ERRORES
  const [errores, setErrores] = useState<any>({});

  useEffect(() => {
    const ref = collection(db, "celulares");

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const lista: any[] = [];

      snapshot.forEach((docSnap) => {
        lista.push({ id: docSnap.id, ...docSnap.data() });
      });

      setProductos(lista);
    });

    return () => unsubscribe();
  }, []);

  const android = productos.filter(p => p.tipo === "android");
  const ios = productos.filter(p => p.tipo === "ios");
  const modular = productos.filter(p => p.tipo === "modular");

  const toggleVisibilidadProducto = async (id: string, estadoActual: boolean) => {

    setProductos(prev =>
      prev.map(p =>
        p.id === id ? { ...p, visibilidad: !estadoActual } : p
      )
    );

    try {
      await updateDoc(doc(db, "celulares", id), {
        visibilidad: !estadoActual,
      });
    } catch (error) {
      console.error("Error guardando visibilidad:", error);
    }
  };

  // 🔥 NUEVO: ELIMINAR PRODUCTO
  const eliminarProducto = async (id: string) => {
    const confirmar = window.confirm("¿Seguro que quieres eliminar este producto?");
    if (!confirmar) return;

    try {
      await deleteDoc(doc(db, "celulares", id));
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  };

  // 🔥 INPUT HANDLER
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 VALIDACIÓN
  const validar = () => {
    const nuevosErrores: any = {};

    if (!form.marca) nuevosErrores.marca = "Requerido";
    if (!form.modelo) nuevosErrores.modelo = "Requerido";

    if (!form.precio_cop || isNaN(Number(form.precio_cop))) {
      nuevosErrores.precio_cop = "Debe ser número";
    }

    if (form.peso_g && isNaN(Number(form.peso_g))) {
      nuevosErrores.peso_g = "Debe ser número";
    }

    if (form.año && isNaN(Number(form.año))) {
      nuevosErrores.año = "Debe ser número";
    }

    if (form.huella_co2e_kg && isNaN(Number(form.huella_co2e_kg))) {
      nuevosErrores.huella_co2e_kg = "Debe ser número";
    }

    if (form.imagen) {
      try {
        new URL(form.imagen);
      } catch {
        nuevosErrores.imagen = "URL inválida";
      }
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // 🔥 GUARDAR
  const guardarProducto = async () => {
    if (!tipoSeleccionado) return;

    if (!validar()) return;

    await addDoc(collection(db, "celulares"), {
      ...form,

      precio_cop: Number(form.precio_cop),
      peso_g: Number(form.peso_g),
      año: Number(form.año),
      huella_co2e_kg: Number(form.huella_co2e_kg),

      tipo: tipoSeleccionado,
      visibilidad: true
    });

    setMostrarModal(false);
  };

  const renderProductos = (lista: any[], tipo: string) => (
    <div className="options-grid-admin-productos">

      {/* PRODUCTOS */}
      {lista.map((p) => {
        const visible = p.visibilidad ?? true;

        return (
          <div className="option-item-admin-productos" key={p.id}>

            <div
              className={`option-card-admin-productos ${!visible ? "oculto" : ""}`}
              style={{
                filter: visible ? "none" : "brightness(0.6)"
              }}
            >

              {/* 🔥 NUEVO: CONTENEDOR DE ACCIONES */}
              <div className="actions-top-admin-productos">

                {/* ELIMINAR */}
                <button
                  className="delete-btn-admin-productos"
                  onClick={() => eliminarProducto(p.id)}
                >
                  <img
                    src="/eliminar.png"
                    alt="eliminar"
                    className="icon-toggle-admin-productos"
                  />
                </button>

                {/* VISIBILIDAD */}
                <button
                  className="toggle-btn-admin-productos"
                  onClick={() => toggleVisibilidadProducto(p.id, visible)}
                >
                  <img
                    src={visible ? "/visible.png" : "/oculto.png"}
                    alt="toggle"
                    className="icon-toggle-admin-productos"
                  />
                </button>

              </div>

              <div className="option-image-admin-productos">
                <img
                  src={p.imagen}
                  alt={p.modelo}
                  className="brand-logo-admin-productos"
                />
              </div>

            </div>

            <div className="option-footer-admin-productos">
              <div>
                <p className="option-name-admin-productos">{p.modelo}</p>
                <p className="option-price-admin-productos">
                  COP {p.precio_cop?.toLocaleString()}
                </p>
              </div>

              <button className="edit-btn-admin-productos">
                Editar
              </button>
            </div>

          </div>
        );
      })}

      {/* 🔥 AGREGAR */}
      <div className="option-item-admin-productos">

        <div className="option-card-admin-productos add-card-admin-productos">
          <div className="option-image-admin-productos">
            <img
              src="/celular.png"
              alt="Agregar producto"
              className="brand-logo-admin-productos"
            />
          </div>
        </div>

        <button
          className="add-btn-admin-productos"
          onClick={() => {
            setTipoSeleccionado(tipo);
            setMostrarModal(true);
          }}
        >
          Agregar producto
        </button>

      </div>

    </div>
  );

  return (
    <div className="admin-productos">

      <HeaderAdmin />

      <main className="admin-productos-main">

        <div className="admin-productos-hero">
          <div className="admin-productos-hero-content">
            <h1 className="admin-productos-title">BloomMarket</h1>
            <h2 className="admin-productos-subtitle">Semillero de HCD</h2>
          </div>

          <div className="admin-productos-circle">
            <img src="/flor.png" alt="Flor" />
          </div>
        </div>

        <div className="admin-productos-section">

          <h2 className="admin-productos-section-title">Smartphones</h2>
          <p className="admin-productos-section-subtitle">
            Lista de todos los productos
          </p>

          <h3 className="titulo-categoria-admin-productos">Android</h3>
          {renderProductos(android, "android")}

          <h3 className="titulo-categoria-admin-productos">iOS</h3>
          {renderProductos(ios, "ios")}

          <h3 className="titulo-categoria-admin-productos">Modular</h3>
          {renderProductos(modular, "modular")}

        </div>

      </main>

      {/* 🔥 MODAL */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">

            <h2>Nuevo producto ({tipoSeleccionado})</h2>

            <input name="marca" placeholder="Marca" onChange={handleChange} />
            {errores.marca && <span className="error">{errores.marca}</span>}

            <input name="modelo" placeholder="Modelo" onChange={handleChange} />
            {errores.modelo && <span className="error">{errores.modelo}</span>}

            <input
              name="precio_cop"
              placeholder="Precio"
              value={form.precio_cop}
              onChange={(e) => {
                const valor = e.target.value;
                if (/^\d*$/.test(valor)) {
                  setForm({ ...form, precio_cop: valor });
                }
              }}
            />
            {errores.precio_cop && <span className="error">{errores.precio_cop}</span>}

            <input name="imagen" placeholder="URL imagen" onChange={handleChange} />
            {errores.imagen && <span className="error">{errores.imagen}</span>}

            <input name="pantalla" placeholder="Pantalla" onChange={handleChange} />
            <input name="almacenamiento_base" placeholder="Almacenamiento" onChange={handleChange} />
            <input name="os" placeholder="Sistema operativo" onChange={handleChange} />

            <input
              name="peso_g"
              placeholder="Peso (g)"
              value={form.peso_g}
              onChange={(e) => {
                const valor = e.target.value;
                if (/^\d*$/.test(valor)) {
                  setForm({ ...form, peso_g: valor });
                }
              }}
            />

            <input name="resistencia" placeholder="Resistencia" onChange={handleChange} />

            <input
              name="año"
              placeholder="Año"
              value={form.año}
              onChange={(e) => {
                const valor = e.target.value;
                if (/^\d*$/.test(valor)) {
                  setForm({ ...form, año: valor });
                }
              }}
            />

            <input
              name="huella_co2e_kg"
              placeholder="Huella CO2"
              value={form.huella_co2e_kg}
              onChange={(e) => {
                const valor = e.target.value;
                if (/^\d*$/.test(valor)) {
                  setForm({ ...form, huella_co2e_kg: valor });
                }
              }}
            />

            <input name="materiales_ambientales" placeholder="Materiales" onChange={handleChange} />

            <button onClick={guardarProducto}>Guardar</button>
            <button onClick={() => setMostrarModal(false)}>Cancelar</button>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminProductos;