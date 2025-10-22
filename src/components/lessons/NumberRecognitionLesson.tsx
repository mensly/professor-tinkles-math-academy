import React from 'react';
import { Hash, Calculator, Plus, Minus } from 'lucide-react';
import BaseLesson, { LessonData, Problem } from './BaseLesson';

interface NumberRecognitionLessonProps {
  onComplete?: (score: number) => void;
  onTeaTime?: () => void;
}

const NumberRecognitionLesson: React.FC<NumberRecognitionLessonProps> = ({ onComplete, onTeaTime }) => {
  const problems: Problem[] = [
    {
      question: "Professor Tinkles is showing you a number. What number is this: 5?",
      answer: 5,
      options: [3, 4, 5, 6],
      explanation: "This is the number 5! It's written as '5' and we say 'five'. Great job recognizing it!",
      concept: "Number Identification"
    },
    {
      question: "Sir Whiskersworth has 7 garden tools. Which number shows seven?",
      answer: 7,
      options: [6, 7, 8, 9],
      explanation: "The number 7 shows seven! Sir Whiskersworth has 7 garden tools in his collection.",
      concept: "Number Recognition"
    },
    {
      question: "Lady Pawsington is counting her books. She has 12 books. What number comes after 11?",
      answer: 12,
      options: [10, 11, 12, 13],
      explanation: "After 11 comes 12! Lady Pawsington has 12 books in her library.",
      concept: "Number Sequence"
    },
    {
      question: "Inspector Clawson found 15 clues. Which number is bigger: 15 or 13?",
      answer: 15,
      options: [13, 14, 15, 16],
      explanation: "15 is bigger than 13! Inspector Clawson found 15 clues, which is more than 13.",
      concept: "Number Comparison"
    },
    {
      question: "Professor Tinkles is writing numbers. What number comes between 8 and 10?",
      answer: 9,
      options: [7, 8, 9, 10],
      explanation: "The number 9 comes between 8 and 10! The sequence is: 8, 9, 10.",
      concept: "Number Order"
    }
  ];

  const getConceptIcon = (concept: string) => {
    switch (concept) {
      case 'Number Identification': return <Hash size={32} />;
      case 'Number Recognition': return <Calculator size={32} />;
      case 'Number Sequence': return <Plus size={32} />;
      case 'Number Comparison': return <Minus size={32} />;
      case 'Number Order': return <Hash size={32} />;
      default: return <Hash size={32} />;
    }
  };

  const lessonData: LessonData = {
    title: "Number Recognition",
    instructor: "Professor Tinkles",
    emoji: "🔢",
    className: "number-recognition-lesson",
    difficulty: "beginner",
    problems,
    getScoreMessage: (score: number, total: number) => {
      const percentage = (score / total) * 100;
      if (percentage === 100) return "Purr-fect! You're a number recognition expert! 🐱";
      if (percentage >= 80) return "Brilliant! You know your numbers very well! 🌟";
      if (percentage >= 60) return "Good job! A few more practice sessions and you'll be purr-fect! 📚";
      return "Keep practicing! Learning numbers is the first step to becoming a math genius! 💪";
    },
    getConceptIcon,
    getCorrectMessage: () => "Excellent number recognition!",
    getIncorrectMessage: () => "Let's practice numbers together."
  };

  return <BaseLesson lesson={lessonData} onComplete={onComplete} onTeaTime={onTeaTime} />;
};

export default NumberRecognitionLesson;
