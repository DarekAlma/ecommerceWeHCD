import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "./config";

export interface Celular {
  id: string;
  almacenamiento_base: string;
  año: number;
  huella_co2e_kg: number;
  marca: string;
  materiales_ambientales: string;
  modelo: string;
  os: string;
  pantalla: string;
  peso_g: number;
  precio_cop: number;
  resistencia: string;
}

// Trae todos los celulares
export const obtenerCelulares = async (): Promise<Celular[]> => {
  const snapshot = await getDocs(collection(db, "celulares"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Celular[];
};

// Trae un celular por ID
export const obtenerCelularPorId = async (id: string): Promise<Celular | null> => {
  const ref = doc(db, "celulares", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Celular;
};