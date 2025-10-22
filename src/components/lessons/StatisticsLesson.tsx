import React from 'react';
import { BarChart3, TrendingUp, PieChart } from 'lucide-react';
import { DynamicLessonData } from '../../types/lesson';
import DynamicLesson from './DynamicLesson';

interface StatisticsLessonProps {
  onComplete?: (score: number) => void;
  onTeaTime?: () => void;
}

const StatisticsLesson: React.FC<StatisticsLessonProps> = ({ onComplete, onTeaTime }) => {
  const getConceptIcon = (concept: string) => {
    switch (concept) {
      case 'Mean': return <BarChart3 size={32} />;
      case 'Median': return <TrendingUp size={32} />;
      case 'Mode': return <PieChart size={32} />;
      case 'Probability': return <PieChart size={32} />;
      case 'Data Analysis': return <BarChart3 size={32} />;
      default: return <BarChart3 size={32} />;
    }
  };

  const lessonData: DynamicLessonData = {
    lessonName: 'statistics',
    className: 'statistics-lesson',
    questionCount: 5,
    getScoreMessage: (score: number, total: number) => {
      const percentage = (score / total) * 100;
      if (percentage === 100) return "Purr-fect! You're a statistical genius! 📈";
      if (percentage >= 80) return "Brilliant! Your data analysis skills are excellent! ⭐";
      if (percentage >= 60) return "Good work! A few more practice sessions and you'll be purr-fect! 📊";
      return "Keep practicing! Statistics is like counting cat treats - it gets easier with practice! 🐱";
    },
    getConceptIcon,
    getCorrectMessage: () => "Statistically significant!",
    getIncorrectMessage: () => "Not quite the right calculation."
  };

  return <DynamicLesson lesson={lessonData} onComplete={onComplete} onTeaTime={onTeaTime} />;
};

export default StatisticsLesson;