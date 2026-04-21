import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./config";

// Registro
export const registrarUsuario = async (email: string, password: string, nombre: string) => {
  const credencial = await createUserWithEmailAndPassword(auth, email, password);
  
  // Crea el documento del usuario en Firestore automáticamente
  await setDoc(doc(db, "usuarios", credencial.user.uid), {
    email,
    nombre,
    createdAt: serverTimestamp(),
    carrito: [],
  });

  return credencial.user;
};

// Login
export const iniciarSesion = async (email: string, password: string) => {
  const credencial = await signInWithEmailAndPassword(auth, email, password);
  return credencial.user;
};

// Logout
export const cerrarSesion = async () => {
  await signOut(auth);
};

// Observer: detecta si hay sesión activa
export const escucharSesion = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};