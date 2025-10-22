import React from 'react';
import BaseLesson, { LessonData, Problem } from './BaseLesson';

interface ArithmeticLessonProps {
  onComplete?: (score: number) => void;
  onTeaTime?: () => void;
}

const ArithmeticLesson: React.FC<ArithmeticLessonProps> = ({ onComplete, onTeaTime }) => {
  const problems: Problem[] = [
    {
      question: "Professor Tinkles has 8 teacups. If he breaks 3 during his morning tea ceremony, how many teacups does he have left?",
      answer: 5,
      options: [3, 5, 8, 11],
      explanation: "8 - 3 = 5. Professor Tinkles is quite careful with his remaining teacups!"
    },
    {
      question: "Sir Whiskersworth needs to measure 4 sides of a square. If each side is 3 paws long, what's the total perimeter?",
      answer: 12,
      options: [7, 9, 12, 16],
      explanation: "4 sides × 3 paws = 12 paws. A perfectly measured square, as expected from Sir Whiskersworth!"
    },
    {
      question: "Lady Pawsington has 6 algebra books. She buys 4 more at the cat bookstore. How many books does she have now?",
      answer: 10,
      options: [8, 10, 12, 14],
      explanation: "6 + 4 = 10. Lady Pawsington's library is growing quite nicely!"
    },
    {
      question: "Inspector Clawson found 15 clues in a mathematical mystery. If he solved 9 of them, how many clues remain unsolved?",
      answer: 6,
      options: [4, 6, 9, 15],
      explanation: "15 - 9 = 6. The Inspector is making excellent progress on this case!"
    },
    {
      question: "If Professor Tinkles serves tea to 3 cats and each cat drinks 2 cups, how many cups of tea are served in total?",
      answer: 6,
      options: [5, 6, 8, 9],
      explanation: "3 cats × 2 cups = 6 cups. A proper British tea service for all the feline scholars!"
    }
  ];

  const lessonData: LessonData = {
    title: "Basic Arithmetic",
    instructor: "Professor Tinkles",
    emoji: "🐱",
    className: "arithmetic-lesson",
    difficulty: "beginner",
    problems,
    getScoreMessage: (score: number, total: number) => {
      const percentage = (score / total) * 100;
      if (percentage === 100) return "Purr-fect! You're a mathematical genius! 🐱";
      if (percentage >= 80) return "Brilliant work! You've mastered the basics! 🌟";
      if (percentage >= 60) return "Good job! A few more practice sessions and you'll be purr-fect! 📚";
      return "Keep practicing! Even the best mathematicians started somewhere! 💪";
    },
    getCorrectMessage: () => "Brilliant!",
    getIncorrectMessage: () => "Not quite right."
  };

  return <BaseLesson lesson={lessonData} onComplete={onComplete} onTeaTime={onTeaTime} />;
};

export default ArithmeticLesson;
