import React from 'react';
import DynamicLesson from './DynamicLesson';
import { DynamicLessonData } from '../../types/lesson';

interface MathNatureLessonProps {
  onComplete?: (score: number) => void;
  onTeaTime?: () => void;
}

const MathNatureLesson: React.FC<MathNatureLessonProps> = ({
  onComplete,
  onTeaTime
}) => {
  const lessonData: DynamicLessonData = {
    lessonName: 'math-nature',
    className: 'math-nature-lesson',
    questionCount: 5,
    getScoreMessage: (score: number, total: number) => {
      const percentage = (score / total) * 100;
      if (percentage === 100) return "Purr-fect! You've mastered mathematics in nature! 🌿";
      if (percentage >= 80) return "Excellent work! You understand nature's mathematical patterns! 🌸";
      if (percentage >= 60) return "Good job! Keep exploring the math in nature! 🍃";
      return "Don't worry! Nature's mathematics takes time to appreciate. Keep observing! 🌺";
    },
    getConceptIcon: (concept: string) => {
      const icons: { [key: string]: string } = {
        'Fibonacci Sequence': '🐚',
        'Golden Ratio': '🌻',
        'Fractals': '🌿',
        'Symmetry': '🦋',
        'Patterns': '❄️'
      };
      return icons[concept] || '📚';
    },
    getCorrectMessage: (isCorrect: boolean) => {
      if (isCorrect) {
        return "Excellent! You've discovered nature's mathematical secrets!";
      }
      return "Not quite! Look closer at the patterns in nature around you.";
    },
    getIncorrectMessage: (isCorrect: boolean) => {
      if (isCorrect) {
        return "Purr-fect observation! You're seeing the mathematics in nature!";
      }
      return "Don't worry! Nature's patterns are complex. Keep exploring the mathematical beauty around us!";
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

export default MathNatureLesson;
