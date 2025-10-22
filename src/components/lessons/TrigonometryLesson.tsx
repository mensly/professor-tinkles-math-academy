import React from 'react';
import { Circle, Triangle, TrendingUp } from 'lucide-react';
import BaseLesson, { LessonData, Problem } from './BaseLesson';

interface TrigonometryLessonProps {
  onComplete?: (score: number) => void;
  onTeaTime?: () => void;
}

const TrigonometryLesson: React.FC<TrigonometryLessonProps> = ({ onComplete, onTeaTime }) => {
  const problems: Problem[] = [
    {
      question: "Sir Whiskersworth has a right triangle with opposite side 3 and hypotenuse 5. What is sin(θ)?",
      answer: 0.6,
      options: [0.4, 0.6, 0.8, 1.0],
      explanation: "sin(θ) = opposite/hypotenuse = 3/5 = 0.6. The sine of an angle is the ratio of the opposite side to the hypotenuse.",
      concept: "Sine Function"
    },
    {
      question: "Lady Pawsington's triangle has adjacent side 4 and hypotenuse 5. What is cos(θ)?",
      answer: 0.8,
      options: [0.4, 0.6, 0.8, 1.0],
      explanation: "cos(θ) = adjacent/hypotenuse = 4/5 = 0.8. The cosine of an angle is the ratio of the adjacent side to the hypotenuse.",
      concept: "Cosine Function"
    },
    {
      question: "Professor Tinkles has a triangle with opposite side 3 and adjacent side 4. What is tan(θ)?",
      answer: 0.75,
      options: [0.6, 0.75, 1.33, 1.5],
      explanation: "tan(θ) = opposite/adjacent = 3/4 = 0.75. The tangent of an angle is the ratio of the opposite side to the adjacent side.",
      concept: "Tangent Function"
    },
    {
      question: "Inspector Clawson needs to find the angle whose sine is 0.5. What is this angle in degrees?",
      answer: 30,
      options: [15, 30, 45, 60],
      explanation: "sin(30°) = 0.5. This is a special angle in trigonometry. The sine of 30 degrees is exactly 0.5.",
      concept: "Inverse Trigonometry"
    },
    {
      question: "A cat is 10 meters from a tree and looks up at a 30° angle. How tall is the tree? (Use tan(30°) ≈ 0.577)",
      answer: 5.77,
      options: [5.0, 5.77, 8.66, 10.0],
      explanation: "tan(30°) = height/distance, so height = distance × tan(30°) = 10 × 0.577 = 5.77 meters.",
      concept: "Applications"
    }
  ];

  const getConceptIcon = (concept: string) => {
    switch (concept) {
      case 'Sine Function': return <Circle size={32} />;
      case 'Cosine Function': return <Triangle size={32} />;
      case 'Tangent Function': return <TrendingUp size={32} />;
      case 'Inverse Trigonometry': return <Circle size={32} />;
      case 'Applications': return <Triangle size={32} />;
      default: return <Circle size={32} />;
    }
  };

  const lessonData: LessonData = {
    title: "Trigonometry",
    instructor: "Sir Whiskersworth",
    emoji: "📐",
    className: "trigonometry-lesson",
    difficulty: "intermediate",
    problems,
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

  return <BaseLesson lesson={lessonData} onComplete={onComplete} onTeaTime={onTeaTime} />;
};

export default TrigonometryLesson;