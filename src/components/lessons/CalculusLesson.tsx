import React from 'react';
import { Calculator, TrendingUp, Zap } from 'lucide-react';
import { DynamicLessonData } from '../../types/lesson';
import DynamicLesson from './DynamicLesson';

interface CalculusLessonProps {
  onComplete?: (score: number) => void;
  onTeaTime?: () => void;
}

const CalculusLesson: React.FC<CalculusLessonProps> = ({ onComplete, onTeaTime }) => {
  const getConceptIcon = (concept: string) => {
    switch (concept) {
      case 'Basic Derivatives': return <Calculator size={32} />;
      case 'Linear Derivatives': return <TrendingUp size={32} />;
      case 'Basic Integration': return <Zap size={32} />;
      case 'Antiderivatives': return <Calculator size={32} />;
      case 'Exponential Derivatives': return <Zap size={32} />;
      default: return <Calculator size={32} />;
    }
  };

  const lessonData: DynamicLessonData = {
    lessonName: 'calculus',
    className: 'calculus-lesson',
    questionCount: 5,
    getScoreMessage: (score: number, total: number) => {
      const percentage = (score / total) * 100;
      if (percentage === 100) return "Magnificent! You've mastered the fundamentals of calculus! 🧮";
      if (percentage >= 80) return "Brilliant! Your calculus intuition is purr-fect! ⭐";
      if (percentage >= 60) return "Excellent work! You're well on your way to calculus mastery! 📈";
      return "Keep practicing! Calculus is like a good cup of tea - it takes time to steep! ☕";
    },
    getConceptIcon,
    getCorrectMessage: () => "Calculus-tastic!",
    getIncorrectMessage: () => "Not quite the right derivative."
  };

  return <DynamicLesson lesson={lessonData} onComplete={onComplete} onTeaTime={onTeaTime} />;
};

export default CalculusLesson;
