import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { DynamicLessonData } from '../../types/lesson';
import DynamicLesson from './DynamicLesson';

interface SetTheoryLessonProps {
  onComplete?: (score: number) => void;
  onTeaTime?: () => void;
}

const SetTheoryLesson: React.FC<SetTheoryLessonProps> = ({ onComplete, onTeaTime }) => {
  const getConceptIcon = (concept: string) => {
    switch (concept) {
      case 'Union': return <Plus size={32} />;
      case 'Intersection': return <Minus size={32} />;
      case 'Complement': return <Plus size={32} />;
      case 'Subsets': return <Minus size={32} />;
      case 'Venn Diagrams': return <Plus size={32} />;
      default: return <Plus size={32} />;
    }
  };

  const lessonData: DynamicLessonData = {
    lessonName: 'set-theory',
    className: 'set-theory-lesson',
    questionCount: 5,
    getScoreMessage: (score: number, total: number) => {
      const percentage = (score / total) * 100;
      if (percentage === 100) return "Magnificent! You've mastered the fundamentals of set theory! 🧮";
      if (percentage >= 80) return "Brilliant! Your set theory intuition is purr-fect! ⭐";
      if (percentage >= 60) return "Excellent work! You're well on your way to set theory mastery! 📈";
      return "Keep practicing! Set theory is like organizing a cat's toy collection - it takes time to sort! 🐱";
    },
    getConceptIcon,
    getCorrectMessage: () => "Set-tastic!",
    getIncorrectMessage: () => "Not quite the right set operation."
  };

  return <DynamicLesson lesson={lessonData} onComplete={onComplete} onTeaTime={onTeaTime} />;
};

export default SetTheoryLesson;