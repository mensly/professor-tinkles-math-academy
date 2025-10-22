import React from 'react';
import { Triangle, Circle, Square } from 'lucide-react';
import { DynamicLessonData } from '../../types/lesson';
import DynamicLesson from './DynamicLesson';

interface GeometryLessonProps {
  onComplete?: (score: number) => void;
  onTeaTime?: () => void;
}

const GeometryLesson: React.FC<GeometryLessonProps> = ({ onComplete, onTeaTime }) => {
  const getConceptIcon = (concept: string) => {
    switch (concept) {
      case 'Perimeter': return <Triangle size={32} />;
      case 'Area': return <Square size={32} />;
      case 'Circles': return <Circle size={32} />;
      case 'Triangles': return <Triangle size={32} />;
      case 'Rectangles': return <Square size={32} />;
      case 'Squares': return <Square size={32} />;
      default: return <Circle size={32} />;
    }
  };

  const lessonData: DynamicLessonData = {
    lessonName: 'geometry',
    className: 'geometry-lesson',
    questionCount: 5,
    getScoreMessage: (score: number, total: number) => {
      const percentage = (score / total) * 100;
      if (percentage === 100) return "Purr-fect geometry! You're a shape-shifting genius! 🔺";
      if (percentage >= 80) return "Brilliant! Your geometric intuition is spot on! ⭐";
      if (percentage >= 60) return "Good work! A few more angles and you'll be purr-fect! 📐";
      return "Keep practicing! Every great architect started with basic shapes! 🏗️";
    },
    getConceptIcon,
    getCorrectMessage: () => "Precisely measured!",
    getIncorrectMessage: () => "Not quite the right angle."
  };

  return <DynamicLesson lesson={lessonData} onComplete={onComplete} onTeaTime={onTeaTime} />;
};

export default GeometryLesson;
