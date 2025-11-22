
export interface ComicPanelData {
  id: string;
  imageUrl: string;
  caption: string;
  scenario: string;
  language: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // index 0-3
  encouragement: string; // Funny/motivational message for correct answer
}

export enum LoadingState {
  IDLE = 'IDLE',
  GENERATING_STORY = 'GENERATING_STORY',
  PAINTING_IMAGE = 'PAINTING_IMAGE',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR',
}
