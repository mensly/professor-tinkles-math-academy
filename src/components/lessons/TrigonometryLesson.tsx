import React from 'react';
import { Circle, Triangle, TrendingUp } from 'lucide-react';
import { DynamicLessonData } from '../../types/lesson';
import DynamicLesson from './DynamicLesson';

interface TrigonometryLessonProps {
  onComplete?: (score: number) => void;
  onTeaTime?: () => void;
}

const TrigonometryLesson: React.FC<TrigonometryLessonProps> = ({ onComplete, onTeaTime }) => {
  const getConceptIcon = (concept: string) => {
    switch (concept) {
      case 'Sine': return <Circle size={32} />;
      case 'Cosine': return <Triangle size={32} />;
      case 'Tangent': return <TrendingUp size={32} />;
      case 'Angles': return <Circle size={32} />;
      case 'Triangles': return <Triangle size={32} />;
      default: return <Circle size={32} />;
    }
  };

  const lessonData: DynamicLessonData = {
    lessonName: 'trigonometry',
    className: 'trigonometry-lesson',
    questionCount: 5,
    getScoreMessage: (score: number, total: number) => {
      const percentage = (score / total) * 100;
      if (percentage === 100) return "Purr-fect trigonometry! You've mastered angles and ratios! 📐";
      if (percentage >= 80) return "Brilliant! Your trigonometric intuition is spot on! ⭐";
      if (percentage >= 60) return "Good work! A few more angles and you'll be purr-fect! 📊";
      return "Keep practicing! Trigonometry is like measuring a cat's curiosity - it takes precision! 🐱";
    },
    getConceptIcon,
    getCorrectMessage: () => "Precisely calculated!",
    getIncorrectMessage: () => "Not quite the right angle."
  };

  return <DynamicLesson lesson={lessonData} onComplete={onComplete} onTeaTime={onTeaTime} />;
};

export default TrigonometryLesson;