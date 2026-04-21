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