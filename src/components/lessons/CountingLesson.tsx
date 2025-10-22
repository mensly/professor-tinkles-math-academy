import React from 'react';
import { Hash, Calculator, Plus } from 'lucide-react';
import BaseLesson, { LessonData, Problem } from './BaseLesson';

interface CountingLessonProps {
  onComplete?: (score: number) => void;
  onTeaTime?: () => void;
}

const CountingLesson: React.FC<CountingLessonProps> = ({ onComplete, onTeaTime }) => {
  const problems: Problem[] = [
    {
      question: "Professor Tinkles has 3 teacups on his desk. If he adds 2 more, how many teacups does he have in total?",
      answer: 5,
      options: [3, 4, 5, 6],
      explanation: "3 + 2 = 5. Professor Tinkles now has 5 teacups on his desk!",
      concept: "Basic Addition"
    },
    {
      question: "Sir Whiskersworth is counting his garden tools. He has 7 tools and gives away 3. How many tools does he have left?",
      answer: 4,
      options: [3, 4, 5, 6],
      explanation: "7 - 3 = 4. Sir Whiskersworth has 4 garden tools remaining!",
      concept: "Basic Subtraction"
    },
    {
      question: "Lady Pawsington is organizing her books. She has 2 shelves with 4 books each. How many books does she have in total?",
      answer: 8,
      options: [6, 7, 8, 9],
      explanation: "2 shelves × 4 books = 8 books. Lady Pawsington has 8 books in her collection!",
      concept: "Basic Multiplication"
    },
    {
      question: "Inspector Clawson found 12 clues in his investigation. If he divides them equally among 3 cases, how many clues per case?",
      answer: 4,
      options: [3, 4, 5, 6],
      explanation: "12 ÷ 3 = 4. Each case gets 4 clues. Elementary, my dear student!",
      concept: "Basic Division"
    },
    {
      question: "Professor Tinkles is counting by 2s: 2, 4, 6, 8, ?. What comes next?",
      answer: 10,
      options: [9, 10, 11, 12],
      explanation: "Counting by 2s: 2, 4, 6, 8, 10. The next number is 10!",
      concept: "Skip Counting"
    }
  ];

  const getConceptIcon = (concept: string) => {
    switch (concept) {
      case 'Basic Addition': return <Plus size={32} />;
      case 'Basic Subtraction': return <Calculator size={32} />;
      case 'Basic Multiplication': return <Hash size={32} />;
      case 'Basic Division': return <Calculator size={32} />;
      case 'Skip Counting': return <Hash size={32} />;
      default: return <Calculator size={32} />;
    }
  };

  const lessonData: LessonData = {
    title: "Counting",
    instructor: "Professor Tinkles",
    emoji: "🔢",
    className: "counting-lesson",
    difficulty: "beginner",
    problems,
    getScoreMessage: (score: number, total: number) => {
      const percentage = (score / total) * 100;
      if (percentage === 100) return "Purr-fect counting! You're a mathematical genius! 🐱";
      if (percentage >= 80) return "Brilliant! You've mastered the basics of counting! 🌟";
      if (percentage >= 60) return "Good job! A few more practice sessions and you'll be purr-fect! 📚";
      return "Keep practicing! Even the best mathematicians started with counting! 💪";
    },
    getConceptIcon,
    getCorrectMessage: () => "Excellent counting!",
    getIncorrectMessage: () => "Let's count again together."
  };

  return <BaseLesson lesson={lessonData} onComplete={onComplete} onTeaTime={onTeaTime} />;
};

export default CountingLesson;
