import React from 'react';
import { Triangle, Circle, Square } from 'lucide-react';
import BaseLesson, { LessonData, Problem } from './BaseLesson';

interface GeometryLessonProps {
  onComplete?: (score: number) => void;
  onTeaTime?: () => void;
}

const GeometryLesson: React.FC<GeometryLessonProps> = ({ onComplete, onTeaTime }) => {
  const problems: Problem[] = [
    {
      question: "Sir Whiskersworth has a triangular garden with sides of 3, 4, and 5 paws. What is the perimeter?",
      answer: 12,
      options: [7, 10, 12, 15],
      explanation: "Perimeter = 3 + 4 + 5 = 12 paws. A perfectly measured triangle, as expected from Sir Whiskersworth!",
      shape: "triangle"
    },
    {
      question: "Lady Pawsington's circular tea table has a radius of 4 paws. What is the diameter?",
      answer: 8,
      options: [4, 6, 8, 12],
      explanation: "Diameter = 2 × radius = 2 × 4 = 8 paws. A perfectly round table for elegant tea service!",
      shape: "circle"
    },
    {
      question: "Inspector Clawson's square investigation board has sides of 6 paws each. What is the area?",
      answer: 36,
      options: [12, 24, 36, 48],
      explanation: "Area = side × side = 6 × 6 = 36 square paws. Plenty of space for all those clues!",
      shape: "square"
    },
    {
      question: "Professor Tinkles has a rectangular study with length 8 paws and width 5 paws. What is the area?",
      answer: 40,
      options: [13, 26, 40, 50],
      explanation: "Area = length × width = 8 × 5 = 40 square paws. A spacious study for mathematical contemplation!",
      shape: "rectangle"
    },
    {
      question: "A cat's circular scratching post has a circumference of 18.84 paws. What is the radius? (Use π ≈ 3.14)",
      answer: 3,
      options: [2, 3, 4, 6],
      explanation: "Circumference = 2πr, so r = 18.84 ÷ (2 × 3.14) = 3 paws. A perfectly sized scratching post!",
      shape: "circle"
    }
  ];

  const getShapeIcon = (shape: string) => {
    switch (shape) {
      case 'triangle': return <Triangle size={32} />;
      case 'circle': return <Circle size={32} />;
      case 'square': return <Square size={32} />;
      case 'rectangle': return <Square size={32} />;
      default: return <Circle size={32} />;
    }
  };

  const lessonData: LessonData = {
    title: "Geometry",
    instructor: "Sir Whiskersworth",
    emoji: "📐",
    className: "geometry-lesson",
    difficulty: "intermediate",
    problems,
    getScoreMessage: (score: number, total: number) => {
      const percentage = (score / total) * 100;
      if (percentage === 100) return "Purr-fect geometry! You're a shape-shifting genius! 🔺";
      if (percentage >= 80) return "Brilliant! Your geometric intuition is spot on! ⭐";
      if (percentage >= 60) return "Good work! A few more angles and you'll be purr-fect! 📐";
      return "Keep practicing! Every great architect started with basic shapes! 🏗️";
    },
    getShapeIcon,
    getCorrectMessage: () => "Precisely measured!",
    getIncorrectMessage: () => "Not quite the right angle."
  };

  return <BaseLesson lesson={lessonData} onComplete={onComplete} onTeaTime={onTeaTime} />;
};

export default GeometryLesson;
