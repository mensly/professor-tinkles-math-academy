import React from 'react';
import { Hash, Calculator, Plus, Minus } from 'lucide-react';
import { DynamicLessonData } from '../../types/lesson';
import DynamicLesson from './DynamicLesson';

interface NumberRecognitionLessonProps {
  onComplete?: (score: number) => void;
  onTeaTime?: () => void;
}

const NumberRecognitionLesson: React.FC<NumberRecognitionLessonProps> = ({ onComplete, onTeaTime }) => {
  const getConceptIcon = (concept: string) => {
    switch (concept) {
      case 'Number Identification': return <Hash size={32} />;
      case 'Number Recognition': return <Calculator size={32} />;
      case 'Number Sequence': return <Plus size={32} />;
      case 'Number Comparison': return <Minus size={32} />;
      case 'Number Order': return <Hash size={32} />;
      default: return <Hash size={32} />;
    }
  };

  const lessonData: DynamicLessonData = {
    lessonName: 'number-recognition',
    className: 'number-recognition-lesson',
    questionCount: 5,
    getScoreMessage: (score: number, total: number) => {
      const percentage = (score / total) * 100;
      if (percentage === 100) return "Purr-fect! You're a number recognition expert! 🐱";
      if (percentage >= 80) return "Brilliant! You know your numbers very well! 🌟";
      if (percentage >= 60) return "Good job! A few more practice sessions and you'll be purr-fect! 📚";
      return "Keep practicing! Learning numbers is the first step to becoming a math genius! 💪";
    },
    getConceptIcon,
    getCorrectMessage: () => "Excellent number recognition!",
    getIncorrectMessage: () => "Let's practice numbers together."
  };

  return <DynamicLesson lesson={lessonData} onComplete={onComplete} onTeaTime={onTeaTime} />;
};

export default NumberRecognitionLesson;
