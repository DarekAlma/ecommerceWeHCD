import { useState, useEffect } from 'react';
import type { SurveyAnswer, SurveySection, PetState, FlowStep, SurveyProgress } from '../types/survey';
import { cargarProgreso, guardarProgreso } from '../firebase/survey';

export const SURVEY_SECTIONS: SurveySection[] = [
  {
    id: 'habitos',
    title: 'Hábitos de compra',
    mascotImage: '/semilla.png',
    questions: [
      {
        id: 'habitos_1',
        text: '¿Con qué frecuencia cambias de smartphone?',
        options: ['Cada 1-2 años', 'Cada 3-4 años', 'Solo cuando es necesario'],
      },
      {
        id: 'habitos_2',
        text: '¿Qué factor es más importante al elegir un smartphone?',
        options: ['El precio', 'El rendimiento', 'La durabilidad'],
      },
    ],
  },
  {
    id: 'presupuesto',
    title: 'Presupuesto y gasto',
    mascotImage: '/tallo.png',
    questions: [
      {
        id: 'presupuesto_1',
        text: '¿Cuánto sueles gastar en un smartphone?',
        options: ['Menos de $300', 'Entre $300 y $700', 'Más de $700'],
      },
      {
        id: 'presupuesto_2',
        text: '¿Pagarías más por un smartphone sostenible?',
        options: ['Sí, definitivamente', 'Depende del precio', 'No, prefiero ahorrar'],
      },
    ],
  },
  {
    id: 'sostenibilidad',
    title: 'Sostenibilidad',
    mascotImage: '/petalo.png',
    questions: [
      {
        id: 'sostenibilidad_1',
        text: '¿Qué haces con tu smartphone cuando lo cambias?',
        options: ['Lo vendo o regalo', 'Lo reciclo', 'Lo guardo en casa'],
      },
      {
        id: 'sostenibilidad_2',
        text: '¿Qué tan importante es el impacto ambiental al comprar?',
        options: ['Muy importante', 'Algo importante', 'No es prioritario'],
      },
    ],
  },
  {
    id: 'modularidad',
    title: 'Modularidad',
    mascotImage: '/flor.png',
    questions: [
      {
        id: 'modularidad_1',
        text: '¿Conocías los smartphones modulares antes de esta app?',
        options: ['Sí, los conozco bien', 'He oído algo', 'No los conocía'],
      },
      {
        id: 'modularidad_2',
        text: '¿Repararías tu smartphone en lugar de reemplazarlo?',
        options: ['Siempre que sea posible', 'Solo si es económico', 'Prefiero uno nuevo'],
      },
    ],
  },
];

const PET_STATES_BY_SECTION: PetState[] = ['semilla', 'tallo', 'petalo', 'flor'];

interface FlowState {
  step: FlowStep;
  sectionIndex: number;
  answers: SurveyAnswer[];
  mascotName: string;
  mascotNamed: boolean;
  validationError: string;
}

const INITIAL_STATE: FlowState = {
  step: 'intro',
  sectionIndex: 0,
  answers: [],
  mascotName: '',
  mascotNamed: false,
  validationError: '',
};

function derivePetState(s: FlowState): PetState {
  if (s.step === 'thanks') return 'flor';
  if (s.step === 'intro') return s.answers.length > 0 ? 'tallo' : 'semilla';
  return PET_STATES_BY_SECTION[s.sectionIndex] ?? 'semilla';
}

function buildProgress(s: FlowState): SurveyProgress {
  const answers: Record<string, string> = {};
  s.answers.forEach(a => { answers[a.questionId] = a.answer; });
  return {
    answers,
    currentStep: s.sectionIndex,
    completed: s.step === 'thanks',
    petState: derivePetState(s),
    step: s.step,
    mascotName: s.mascotName,
    mascotNamed: s.mascotNamed,
  };
}

function restoreState(progress: SurveyProgress): FlowState {
  const answers: SurveyAnswer[] = Object.entries(progress.answers).map(
    ([questionId, answer]) => ({ questionId, answer })
  );
  return {
    step: progress.step ?? 'intro',
    sectionIndex: progress.currentStep ?? 0,
    answers,
    mascotName: progress.mascotName ?? '',
    mascotNamed: progress.mascotNamed ?? false,
    validationError: '',
  };
}

export function useSurveyFlow(uid: string | null) {
  const [state, setState] = useState<FlowState>(INITIAL_STATE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      setLoading(false);
      return;
    }
    cargarProgreso(uid)
      .then(progress => {
        if (progress) setState(restoreState(progress));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [uid]);

  const save = (next: FlowState) => {
    if (!uid) return;
    guardarProgreso(uid, buildProgress(next)).catch(console.error);
  };

  const isStarted = state.answers.length > 0;
  const currentSection = SURVEY_SECTIONS[state.sectionIndex];
  const totalSections = SURVEY_SECTIONS.length;

  const getMascotImage = (): string => {
    if (state.step === 'thanks') return '/flor.png';
    if (state.step === 'intro') return isStarted ? '/tallo.png' : '/semilla.png';
    return currentSection.mascotImage;
  };

  const getAnswerForQuestion = (questionId: string): string =>
    state.answers.find(a => a.questionId === questionId)?.answer ?? '';

  const setAnswer = (questionId: string, answer: string) => {
    setState(prev => {
      const next: FlowState = {
        ...prev,
        answers: [...prev.answers.filter(a => a.questionId !== questionId), { questionId, answer }],
        validationError: '',
      };
      save(next);
      return next;
    });
  };

  const canAdvanceSection = (): boolean => {
    if (!currentSection) return false;
    return currentSection.questions.every(q => getAnswerForQuestion(q.id) !== '');
  };

  const startSurvey = () => {
    setState(prev => {
      const next: FlowState = { ...prev, step: 'section', sectionIndex: 0 };
      save(next);
      return next;
    });
  };

  const nextSection = () => {
    if (!canAdvanceSection()) {
      setState(prev => ({ ...prev, validationError: 'Por favor responde todas las preguntas antes de continuar.' }));
      return;
    }
    setState(prev => {
      const isLast = prev.sectionIndex >= totalSections - 1;
      const next: FlowState = isLast
        ? { ...prev, step: 'thanks', validationError: '' }
        : { ...prev, sectionIndex: prev.sectionIndex + 1, validationError: '' };
      save(next);
      return next;
    });
  };

  const prevSection = () => {
    setState(prev => {
      const next: FlowState = prev.sectionIndex > 0
        ? { ...prev, sectionIndex: prev.sectionIndex - 1, validationError: '' }
        : { ...prev, step: 'intro', validationError: '' };
      save(next);
      return next;
    });
  };

  const setMascotName = (name: string) => {
    setState(prev => ({ ...prev, mascotName: name }));
  };

  const confirmMascotName = () => {
    if (state.mascotName.trim() === '') return;
    setState(prev => {
      const next: FlowState = { ...prev, mascotNamed: true };
      save(next);
      return next;
    });
  };

  const getSurveyPayload = () => ({
    answers: state.answers,
    mascotName: state.mascotName,
    completedAt: new Date().toISOString(),
  });

  return {
    state,
    loading,
    isStarted,
    currentSection,
    totalSections,
    getMascotImage,
    getAnswerForQuestion,
    setAnswer,
    canAdvanceSection,
    startSurvey,
    nextSection,
    prevSection,
    setMascotName,
    confirmMascotName,
    getSurveyPayload,
  };
}