import React from 'react';
import { Hash, Calculator, Plus } from 'lucide-react';
import { DynamicLessonData } from '../../types/lesson';
import DynamicLesson from './DynamicLesson';

interface CountingLessonProps {
  onComplete?: (score: number) => void;
  onTeaTime?: () => void;
}

const CountingLesson: React.FC<CountingLessonProps> = ({ onComplete, onTeaTime }) => {
  const getConceptIcon = (concept: string) => {
    switch (concept) {
      case 'Basic Addition': return <Plus size={32} />;
      case 'Basic Subtraction': return <Calculator size={32} />;
      case 'Basic Multiplication': return <Hash size={32} />;
      case 'Basic Division': return <Calculator size={32} />;
      case 'Skip Counting': return <Hash size={32} />;
      default: return <Calculator size={32} />;
    }
  };

  const lessonData: DynamicLessonData = {
    lessonName: 'counting',
    className: 'counting-lesson',
    questionCount: 5,
    getScoreMessage: (score: number, total: number) => {
      const percentage = (score / total) * 100;
      if (percentage === 100) return "Purr-fect counting! You're a mathematical genius! 🐱";
      if (percentage >= 80) return "Brilliant! You've mastered the basics of counting! 🌟";
      if (percentage >= 60) return "Good job! A few more practice sessions and you'll be purr-fect! 📚";
      return "Keep practicing! Even the best mathematicians started with counting! 💪";
    },
    getConceptIcon,
    getCorrectMessage: () => "Excellent counting!",
    getIncorrectMessage: () => "Let's count again together."
  };

  return <DynamicLesson lesson={lessonData} onComplete={onComplete} onTeaTime={onTeaTime} />;
};

export default CountingLesson;
