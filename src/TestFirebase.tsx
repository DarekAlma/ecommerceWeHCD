import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/config";

const TestFirebase = () => {
  const [datos, setDatos] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    getDocs(collection(db, "celulares"))
      .then((snap) => {
        const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setDatos(docs);
      })
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div style={{ padding: "2rem", fontFamily: "monospace" }}>
      <h2>Celulares en Firebase ({datos.length})</h2>
     {datos.map((d) => (
  <div key={d.id} style={{ marginBottom: "2rem" }}>
    <pre style={{ background: "#f0f0f0", padding: "1rem" }}>
      {JSON.stringify(d, null, 2)}
    </pre>
    {/* Prueba de imagen */}
    {d.imagen && (
      <img 
        src={d.imagen} 
        alt={d.modelo}
        style={{ width: "200px", border: "2px solid red" }}
        onError={(e) => (e.currentTarget.style.outline = "3px solid red")}
      />
    )}
  </div>
))}
    </div>
  );
};

export default TestFirebase;