import React from 'react';
import { Calculator, TrendingUp, Zap } from 'lucide-react';
import BaseLesson, { LessonData, Problem } from './BaseLesson';

interface CalculusLessonProps {
  onComplete?: (score: number) => void;
  onTeaTime?: () => void;
}

const CalculusLesson: React.FC<CalculusLessonProps> = ({ onComplete, onTeaTime }) => {
  const problems: Problem[] = [
    {
      question: "Professor Tinkles is tracking how fast his cat's tail moves. If the position is f(x) = x², what is the derivative at x = 2?",
      answer: 4,
      options: [2, 4, 6, 8],
      explanation: "The derivative of x² is 2x. At x = 2, the derivative is 2(2) = 4. This tells us how fast the tail is moving!",
      concept: "Basic Derivatives"
    },
    {
      question: "Sir Whiskersworth wants to find the slope of his garden path. If the path is described by f(x) = 3x + 1, what is the slope?",
      answer: 3,
      options: [1, 2, 3, 4],
      explanation: "The derivative of 3x + 1 is 3. The slope of a linear function is constant - Sir Whiskersworth's path has a steady incline!",
      concept: "Linear Derivatives"
    },
    {
      question: "Lady Pawsington is calculating the area under her favorite curve f(x) = x from 0 to 4. What is this area?",
      answer: 8,
      options: [4, 6, 8, 10],
      explanation: "The area under f(x) = x from 0 to 4 is ∫₀⁴ x dx = [x²/2]₀⁴ = 16/2 - 0 = 8. A perfect triangular area!",
      concept: "Basic Integration"
    },
    {
      question: "Inspector Clawson is investigating a case where the rate of change is f'(x) = 2x. If f(0) = 3, what is f(2)?",
      answer: 7,
      options: [5, 6, 7, 8],
      explanation: "Since f'(x) = 2x, we have f(x) = x² + C. With f(0) = 3, we get C = 3. So f(2) = 2² + 3 = 7. Elementary, my dear student!",
      concept: "Antiderivatives"
    },
    {
      question: "Professor Tinkles is studying the rate at which tea cools. If the temperature is T(t) = 80e^(-0.1t), what is the rate of cooling at t = 0?",
      answer: -8,
      options: [-6, -8, -10, -12],
      explanation: "The derivative of 80e^(-0.1t) is 80(-0.1)e^(-0.1t) = -8e^(-0.1t). At t = 0, this gives -8. The tea is cooling at 8 degrees per minute!",
      concept: "Exponential Derivatives"
    }
  ];

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

  const lessonData: LessonData = {
    title: "Calculus",
    instructor: "Professor Tinkles",
    emoji: "📊",
    className: "calculus-lesson",
    problems,
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

  return <BaseLesson lesson={lessonData} onComplete={onComplete} onTeaTime={onTeaTime} />;
};

export default CalculusLesson;
