import React from 'react';
import { Hash, Calculator, Zap } from 'lucide-react';
import BaseLesson, { LessonData, Problem } from './BaseLesson';

interface NumberTheoryLessonProps {
  onComplete?: (score: number) => void;
  onTeaTime?: () => void;
}

const NumberTheoryLesson: React.FC<NumberTheoryLessonProps> = ({ onComplete, onTeaTime }) => {
  const problems: Problem[] = [
    {
      question: "Professor Tinkles is studying prime numbers. Which of these is prime?",
      answer: 17,
      options: [15, 16, 17, 18],
      explanation: "17 is prime because it has exactly two factors: 1 and 17. The others are composite (15=3×5, 16=4×4, 18=2×9).",
      concept: "Prime Numbers"
    },
    {
      question: "Sir Whiskersworth needs to find the greatest common divisor of 12 and 18. What is it?",
      answer: 6,
      options: [3, 4, 6, 9],
      explanation: "Factors of 12: 1,2,3,4,6,12. Factors of 18: 1,2,3,6,9,18. The largest common factor is 6.",
      concept: "Greatest Common Divisor"
    },
    {
      question: "Lady Pawsington is working with Fibonacci numbers. What is the 8th Fibonacci number? (F₁=1, F₂=1, Fₙ=Fₙ₋₁+Fₙ₋₂)",
      answer: 21,
      options: [13, 21, 34, 55],
      explanation: "F₁=1, F₂=1, F₃=2, F₄=3, F₅=5, F₆=8, F₇=13, F₈=21. Each number is the sum of the two previous numbers.",
      concept: "Fibonacci Sequence"
    },
    {
      question: "Inspector Clawson found a number that leaves remainder 2 when divided by 3, and remainder 3 when divided by 5. What is the smallest such number?",
      answer: 8,
      options: [7, 8, 9, 11],
      explanation: "8 ÷ 3 = 2 remainder 2, and 8 ÷ 5 = 1 remainder 3. This satisfies both conditions!",
      concept: "Modular Arithmetic"
    },
    {
      question: "Professor Tinkles is studying perfect numbers. Which number is perfect? (A perfect number equals the sum of its proper divisors)",
      answer: 6,
      options: [4, 6, 8, 10],
      explanation: "6 is perfect because its proper divisors are 1, 2, 3, and 1+2+3 = 6. The others don't satisfy this property.",
      concept: "Perfect Numbers"
    }
  ];

  const getConceptIcon = (concept: string) => {
    switch (concept) {
      case 'Prime Numbers': return <Hash size={32} />;
      case 'Greatest Common Divisor': return <Calculator size={32} />;
      case 'Fibonacci Sequence': return <Zap size={32} />;
      case 'Modular Arithmetic': return <Calculator size={32} />;
      case 'Perfect Numbers': return <Hash size={32} />;
      default: return <Hash size={32} />;
    }
  };

  const lessonData: LessonData = {
    title: "Number Theory",
    instructor: "Professor Tinkles",
    emoji: "🔢",
    className: "number-theory-lesson",
    difficulty: "advanced",
    problems,
    getScoreMessage: (score: number, total: number) => {
      const percentage = (score / total) * 100;
      if (percentage === 100) return "Magnificent! You've mastered the beauty of numbers! 🧮";
      if (percentage >= 80) return "Brilliant! Your number theory intuition is purr-fect! ⭐";
      if (percentage >= 60) return "Excellent work! You're well on your way to number theory mastery! 📈";
      return "Keep practicing! Number theory is like a good cup of tea - it takes time to steep! ☕";
    },
    getConceptIcon,
    getCorrectMessage: () => "Number-tastic!",
    getIncorrectMessage: () => "Not quite the right number."
  };

  return <BaseLesson lesson={lessonData} onComplete={onComplete} onTeaTime={onTeaTime} />;
};

export default NumberTheoryLesson;