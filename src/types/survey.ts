export interface SurveyAnswer {
  questionId: string;
  answer: string;
}

export interface SurveyQuestion {
  id: string;
  text: string;
  options: string[];
}

export interface SurveySection {
  id: string;
  title: string;
  questions: SurveyQuestion[];
  mascotImage: string;
}

export interface SurveyPayload {
  answers: SurveyAnswer[];
  mascotName: string;
  completedAt: string;
}

export type PetState = 'semilla' | 'tallo' | 'petalo' | 'flor';

export type FlowStep = 'intro' | 'section' | 'thanks';

export interface SurveyProgress {
  answers: Record<string, string>;
  currentStep: number;
  completed: boolean;
  petState: PetState;
  step: FlowStep;
  mascotName: string;
  mascotNamed: boolean;
}