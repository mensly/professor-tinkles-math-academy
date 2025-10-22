import React from 'react';
import DynamicLesson from './DynamicLesson';
import { DynamicLessonData } from '../../types/lesson';

interface AlgebraBasicsLessonProps {
  onComplete?: (score: number) => void;
  onTeaTime?: () => void;
}

const AlgebraBasicsLesson: React.FC<AlgebraBasicsLessonProps> = ({
  onComplete,
  onTeaTime
}) => {
  const lessonData: DynamicLessonData = {
    lessonName: 'algebra-basics',
    className: 'algebra-basics-lesson',
    questionCount: 5,
    getScoreMessage: (score: number, total: number) => {
      const percentage = (score / total) * 100;
      if (percentage === 100) return "Purr-fect! You've mastered algebra basics! 📐";
      if (percentage >= 80) return "Excellent work! You understand algebra very well! 🧮";
      if (percentage >= 60) return "Good job! Keep practicing with variables and equations! 📊";
      return "Don't worry! Algebra takes time to master. Keep trying! 🔢";
    },
    getConceptIcon: (concept: string) => {
      const icons: { [key: string]: string } = {
        'Variables': '🔤',
        'Equations': '⚖️',
        'Linear Functions': '📈',
        'Graphing': '📊',
        'Problem Solving': '🧠'
      };
      return icons[concept] || '📚';
    },
    getCorrectMessage: (isCorrect: boolean) => {
      if (isCorrect) {
        return "Excellent! You've solved the algebraic puzzle!";
      }
      return "Not quite! Remember to isolate the variable step by step.";
    },
    getIncorrectMessage: (isCorrect: boolean) => {
      if (isCorrect) {
        return "Purr-fect algebra! Variables and equations are your friends!";
      }
      return "Don't worry! Algebra takes practice. Keep working with variables!";
    }
  };

  return (
    <DynamicLesson 
      lesson={lessonData}
      onComplete={onComplete}
      onTeaTime={onTeaTime}
    />
  );
};

export default AlgebraBasicsLesson;
