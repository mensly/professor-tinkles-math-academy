import React from 'react';
import DynamicLesson from './DynamicLesson';
import { DynamicLessonData } from '../../types/lesson';

interface FractionsDecimalsLessonProps {
  onComplete?: (score: number) => void;
  onTeaTime?: () => void;
}

const FractionsDecimalsLesson: React.FC<FractionsDecimalsLessonProps> = ({
  onComplete,
  onTeaTime
}) => {
  const lessonData: DynamicLessonData = {
    lessonName: 'fractions-decimals',
    className: 'fractions-decimals-lesson',
    questionCount: 5,
    getScoreMessage: (score: number, total: number) => {
      const percentage = (score / total) * 100;
      if (percentage === 100) return "Purr-fect! You've mastered fractions and decimals! 🍰";
      if (percentage >= 80) return "Excellent work! You understand fractions and decimals very well! 🥧";
      if (percentage >= 60) return "Good job! Keep practicing with fractions and decimals! 📊";
      return "Don't worry! Fractions and decimals take time to master. Keep trying! 🧮";
    },
    getConceptIcon: (concept: string) => {
      const icons: { [key: string]: string } = {
        'Fractions': '🥧',
        'Decimals': '📊',
        'Converting': '🔄',
        'Comparing': '⚖️',
        'Operations': '🧮'
      };
      return icons[concept] || '📚';
    },
    getCorrectMessage: (isCorrect: boolean) => {
      if (isCorrect) {
        return "Excellent! You've got the hang of fractions and decimals!";
      }
      return "Not quite! Remember to convert between fractions and decimals carefully.";
    },
    getIncorrectMessage: (isCorrect: boolean) => {
      if (isCorrect) {
        return "Purr-fect calculation! Fractions and decimals are your friends!";
      }
      return "Don't worry! Converting between fractions and decimals takes practice.";
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

export default FractionsDecimalsLesson;
