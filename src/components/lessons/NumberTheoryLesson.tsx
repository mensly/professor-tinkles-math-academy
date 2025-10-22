import React from 'react';
import { Hash, Calculator, Zap } from 'lucide-react';
import { DynamicLessonData } from '../../types/lesson';
import DynamicLesson from './DynamicLesson';

interface NumberTheoryLessonProps {
  onComplete?: (score: number) => void;
  onTeaTime?: () => void;
}

const NumberTheoryLesson: React.FC<NumberTheoryLessonProps> = ({ onComplete, onTeaTime }) => {
  const getConceptIcon = (concept: string) => {
    switch (concept) {
      case 'Prime Numbers': return <Hash size={32} />;
      case 'Factors': return <Calculator size={32} />;
      case 'GCD': return <Calculator size={32} />;
      case 'LCM': return <Zap size={32} />;
      case 'Divisibility': return <Hash size={32} />;
      default: return <Hash size={32} />;
    }
  };

  const lessonData: DynamicLessonData = {
    lessonName: 'number-theory',
    className: 'number-theory-lesson',
    questionCount: 5,
    getScoreMessage: (score: number, total: number) => {
      const percentage = (score / total) * 100;
      if (percentage === 100) return "Magnificent! You've mastered the beauty of numbers! 🧮";
      if (percentage >= 80) return "Brilliant! Your number theory intuition is purr-fect! ⭐";
      if (percentage >= 60) return "Excellent work! You're well on your way to number theory mastery! 📈";
      return "Keep practicing! Number theory is like a good cup of tea - it takes time to steep! ☕";
    },
    getConceptIcon,
    getCorrectMessage: () => "Number-tastic!",
    getIncorrectMessage: () => "Not quite the right number."
  };

  return <DynamicLesson lesson={lessonData} onComplete={onComplete} onTeaTime={onTeaTime} />;
};

export default NumberTheoryLesson;