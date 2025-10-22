import React from 'react';
import { BarChart3, TrendingUp, PieChart } from 'lucide-react';
import BaseLesson, { LessonData, Problem } from './BaseLesson';

interface StatisticsLessonProps {
  onComplete?: (score: number) => void;
  onTeaTime?: () => void;
}

const StatisticsLesson: React.FC<StatisticsLessonProps> = ({ onComplete, onTeaTime }) => {
  const problems: Problem[] = [
    {
      question: "Lady Pawsington surveyed 8 cats about their favorite treat. The responses were: 3, 5, 2, 4, 3, 6, 4, 3. What is the mean?",
      answer: 3.75,
      options: [3, 3.5, 3.75, 4],
      explanation: "Mean = (3+5+2+4+3+6+4+3) ÷ 8 = 30 ÷ 8 = 3.75. The average rating is 3.75!",
      concept: "Mean"
    },
    {
      question: "Sir Whiskersworth measured 7 garden plots: 12, 15, 18, 14, 16, 13, 17. What is the median?",
      answer: 15,
      options: [14, 15, 16, 17],
      explanation: "Arrange in order: 12, 13, 14, 15, 16, 17, 18. The median (middle value) is 15.",
      concept: "Median"
    },
    {
      question: "Inspector Clawson found these clue counts: 2, 3, 2, 4, 2, 3, 2. What is the mode?",
      answer: 2,
      options: [2, 3, 4, 5],
      explanation: "The mode is the most frequent value. The number 2 appears 4 times, more than any other number.",
      concept: "Mode"
    },
    {
      question: "Professor Tinkles recorded these tea temperatures: 75, 80, 85, 90, 95. What is the range?",
      answer: 20,
      options: [15, 20, 25, 30],
      explanation: "Range = Maximum - Minimum = 95 - 75 = 20. The temperature range is 20 degrees!",
      concept: "Range"
    },
    {
      question: "If a cat has a 30% chance of catching a mouse on each attempt, what's the probability of catching it in exactly 2 attempts?",
      answer: 0.21,
      options: [0.09, 0.21, 0.30, 0.60],
      explanation: "P(2 attempts) = P(miss first) × P(catch second) = 0.7 × 0.3 = 0.21 or 21%.",
      concept: "Probability"
    }
  ];

  const getConceptIcon = (concept: string) => {
    switch (concept) {
      case 'Mean': return <BarChart3 size={32} />;
      case 'Median': return <TrendingUp size={32} />;
      case 'Mode': return <PieChart size={32} />;
      case 'Range': return <BarChart3 size={32} />;
      case 'Probability': return <PieChart size={32} />;
      default: return <BarChart3 size={32} />;
    }
  };

  const lessonData: LessonData = {
    title: "Statistics & Probability",
    instructor: "Lady Pawsington",
    emoji: "📊",
    className: "statistics-lesson",
    difficulty: "intermediate",
    problems,
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

  return <BaseLesson lesson={lessonData} onComplete={onComplete} onTeaTime={onTeaTime} />;
};

export default StatisticsLesson;