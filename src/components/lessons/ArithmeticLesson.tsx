import React from 'react';
import { Calculator, Plus, Minus, Hash } from 'lucide-react';
import { DynamicLessonData } from '../../types/lesson';
import DynamicLesson from './DynamicLesson';

interface ArithmeticLessonProps {
  onComplete?: (score: number) => void;
  onTeaTime?: () => void;
}

const ArithmeticLesson: React.FC<ArithmeticLessonProps> = ({ onComplete, onTeaTime }) => {
  const getConceptIcon = (concept: string) => {
    switch (concept) {
      case 'Addition': return <Plus size={32} />;
      case 'Subtraction': return <Minus size={32} />;
      case 'Multiplication': return <Hash size={32} />;
      case 'Division': return <Calculator size={32} />;
      case 'Word Problems': return <Calculator size={32} />;
      default: return <Calculator size={32} />;
    }
  };

  const lessonData: DynamicLessonData = {
    lessonName: 'arithmetic',
    className: 'arithmetic-lesson',
    questionCount: 5,
    getScoreMessage: (score: number, total: number) => {
      const percentage = (score / total) * 100;
      if (percentage === 100) return "Purr-fect! You're a mathematical genius! 🐱";
      if (percentage >= 80) return "Brilliant work! You've mastered the basics! 🌟";
      if (percentage >= 60) return "Good job! A few more practice sessions and you'll be purr-fect! 📚";
      return "Keep practicing! Even the best mathematicians started somewhere! 💪";
    },
    getConceptIcon,
    getCorrectMessage: () => "Brilliant!",
    getIncorrectMessage: () => "Not quite right."
  };

  return <DynamicLesson lesson={lessonData} onComplete={onComplete} onTeaTime={onTeaTime} />;
};

export default ArithmeticLesson;
