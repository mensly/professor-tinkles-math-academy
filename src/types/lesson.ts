import React from 'react';

export interface Problem {
  id: string;
  question: string;
  answer: number;
  options: number[];
  explanation: string;
  concept?: string;
  shape?: string;
  [key: string]: any; // Allow for additional custom properties
}

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface LessonData {
  title: string;
  instructor: string;
  emoji: string;
  className: string;
  difficulty: DifficultyLevel;
  problems: Problem[];
  getScoreMessage: (score: number, total: number) => string;
  getConceptIcon?: (concept: string) => React.ReactNode;
  getShapeIcon?: (shape: string) => React.ReactNode;
  getCorrectMessage: (isCorrect: boolean) => string;
  getIncorrectMessage: (isCorrect: boolean) => string;
}

export interface DynamicLessonData {
  lessonName: string;
  className: string;
  getScoreMessage: (score: number, total: number) => string;
  getConceptIcon?: (concept: string) => React.ReactNode;
  getShapeIcon?: (shape: string) => React.ReactNode;
  getCorrectMessage: (isCorrect: boolean) => string;
  getIncorrectMessage: (isCorrect: boolean) => string;
  questionCount?: number;
}

export interface BaseLessonProps {
  lesson: LessonData;
  onComplete?: (score: number) => void;
  onTeaTime?: () => void;
}

export interface DynamicLessonProps {
  lesson: DynamicLessonData;
  onComplete?: (score: number) => void;
  onTeaTime?: () => void;
}
