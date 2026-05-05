import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './config';
import type { SurveyProgress } from '../types/survey';

export async function cargarProgreso(uid: string): Promise<SurveyProgress | null> {
  const snap = await getDoc(doc(db, 'usuarios', uid));
  if (!snap.exists()) return null;
  const data = snap.data();
  return (data.survey as SurveyProgress) ?? null;
}

export async function guardarProgreso(uid: string, progress: SurveyProgress): Promise<void> {
  await updateDoc(doc(db, 'usuarios', uid), { survey: progress });
}