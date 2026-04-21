import { useState } from 'react';
import type { SurveyAnswer, SurveySection } from '../types/survey';

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

type FlowStep = 'intro' | 'section' | 'thanks';

interface FlowState {
  step: FlowStep;
  sectionIndex: number;
  answers: SurveyAnswer[];
  mascotName: string;
  mascotNamed: boolean;
  validationError: string;
}

export function useSurveyFlow() {
  const [state, setState] = useState<FlowState>({
    step: 'intro',
    sectionIndex: 0,
    answers: [],
    mascotName: '',
    mascotNamed: false,
    validationError: '',
  });

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
      const next = prev.answers.filter(a => a.questionId !== questionId);
      return { ...prev, answers: [...next, { questionId, answer }], validationError: '' };
    });
  };

  const canAdvanceSection = (): boolean => {
    if (!currentSection) return false;
    return currentSection.questions.every(q => getAnswerForQuestion(q.id) !== '');
  };

  const startSurvey = () => {
    setState(prev => ({ ...prev, step: 'section', sectionIndex: 0 }));
  };

  const nextSection = () => {
    if (!canAdvanceSection()) {
      setState(prev => ({
        ...prev,
        validationError: 'Por favor responde todas las preguntas antes de continuar.',
      }));
      return;
    }
    if (state.sectionIndex < totalSections - 1) {
      setState(prev => ({
        ...prev,
        sectionIndex: prev.sectionIndex + 1,
        validationError: '',
      }));
    } else {
      setState(prev => ({ ...prev, step: 'thanks', validationError: '' }));
    }
  };

  const prevSection = () => {
    if (state.sectionIndex > 0) {
      setState(prev => ({
        ...prev,
        sectionIndex: prev.sectionIndex - 1,
        validationError: '',
      }));
    } else {
      setState(prev => ({ ...prev, step: 'intro', validationError: '' }));
    }
  };

  const setMascotName = (name: string) => {
    setState(prev => ({ ...prev, mascotName: name }));
  };

  const confirmMascotName = () => {
    if (state.mascotName.trim() === '') return;
    setState(prev => ({ ...prev, mascotNamed: true }));
  };

  const getSurveyPayload = () => ({
    answers: state.answers,
    mascotName: state.mascotName,
    completedAt: new Date().toISOString(),
  });

  return {
    state,
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