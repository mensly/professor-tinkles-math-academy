import React from 'react';
import DynamicLesson from './DynamicLesson';
import { DynamicLessonData } from '../../types/lesson';

interface AppliedMathLessonProps {
  onComplete?: (score: number) => void;
  onTeaTime?: () => void;
}

const AppliedMathLesson: React.FC<AppliedMathLessonProps> = ({
  onComplete,
  onTeaTime
}) => {
  const lessonData: DynamicLessonData = {
    lessonName: 'applied-math',
    className: 'applied-math-lesson',
    questionCount: 5,
    getScoreMessage: (score: number, total: number) => {
      const percentage = (score / total) * 100;
      if (percentage === 100) return "Purr-fect! You've mastered applied mathematics! 🔬";
      if (percentage >= 80) return "Excellent work! You understand real-world applications! 🌍";
      if (percentage >= 60) return "Good job! Keep practicing with applied problems! 📊";
      return "Don't worry! Applied math takes practice. Keep trying! 🧮";
    },
    getConceptIcon: (concept: string) => {
      const icons: { [key: string]: string } = {
        'Real-World Problems': '🌍',
        'Optimization': '⚡',
        'Modeling': '📈',
        'Data Analysis': '📊',
        'Problem Solving': '🧠'
      };
      return icons[concept] || '📚';
    },
    getCorrectMessage: (isCorrect: boolean) => {
      if (isCorrect) {
        return "Excellent! You've solved the real-world problem!";
      }
      return "Not quite! Remember to apply mathematical concepts to practical situations.";
    },
    getIncorrectMessage: (isCorrect: boolean) => {
      if (isCorrect) {
        return "Purr-fect applied math! You're solving real-world problems like a pro!";
      }
      return "Don't worry! Applied mathematics takes practice. Keep working with real scenarios!";
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

export default AppliedMathLesson;
