import React from 'react';
import { Plus, Minus } from 'lucide-react';
import BaseLesson, { LessonData, Problem } from './BaseLesson';

interface SetTheoryLessonProps {
  onComplete?: (score: number) => void;
  onTeaTime?: () => void;
}

const SetTheoryLesson: React.FC<SetTheoryLessonProps> = ({ onComplete, onTeaTime }) => {
  const problems: Problem[] = [
    {
      question: "Professor Tinkles has a set A = {1, 2, 3, 4} and set B = {3, 4, 5, 6}. What is the cardinality of A ∪ B (A union B)?",
      answer: 6,
      options: [4, 5, 6, 8],
      explanation: "The union A ∪ B contains all elements that are in A OR in B (or both). So we combine all unique elements: {1, 2, 3, 4, 5, 6} which has 6 elements.",
      concept: "Set Union"
    },
    {
      question: "Sir Whiskersworth has sets C = {cat, dog, bird} and D = {cat, fish, hamster}. What is the cardinality of C ∩ D (C intersection D)?",
      answer: 1,
      options: [0, 1, 2, 3],
      explanation: "The intersection C ∩ D contains only elements that are in BOTH C and D. Only 'cat' appears in both sets, so C ∩ D = {cat} has 1 element.",
      concept: "Set Intersection"
    },
    {
      question: "Lady Pawsington has set E = {2, 4, 6, 8, 10}. What is the cardinality of set E?",
      answer: 5,
      options: [4, 5, 6, 10],
      explanation: "Cardinality is the number of elements in a set. Set E has 5 elements: {2, 4, 6, 8, 10}, so |E| = 5.",
      concept: "Set Cardinality"
    },
    {
      question: "Inspector Clawson is investigating sets F = {red, blue, green} and G = {blue, green, yellow}. What is the cardinality of F - G (F minus G)?",
      answer: 1,
      options: [0, 1, 2, 3],
      explanation: "F - G contains elements that are in F but NOT in G. Since 'red' is in F but not in G, F - G = {red} has 1 element.",
      concept: "Set Difference"
    },
    {
      question: "Professor Tinkles has a universal set U = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10} and set H = {2, 4, 6, 8, 10}. What is the cardinality of H' (H complement)?",
      answer: 5,
      options: [3, 4, 5, 6],
      explanation: "H' (H complement) contains all elements in the universal set U that are NOT in H. So H' = {1, 3, 5, 7, 9} has 5 elements.",
      concept: "Set Complement"
    }
  ];

  const getConceptIcon = (concept: string) => {
    switch (concept) {
      case 'Set Union': return <Plus size={32} />;
      case 'Set Intersection': return <Minus size={32} />;
      case 'Set Cardinality': return <Plus size={32} />;
      case 'Set Difference': return <Minus size={32} />;
      case 'Set Complement': return <Plus size={32} />;
      default: return <Plus size={32} />;
    }
  };

  const lessonData: LessonData = {
    title: "Set Theory",
    instructor: "Lady Pawsington",
    emoji: "🔗",
    className: "set-theory-lesson",
    difficulty: "intermediate",
    problems,
    getScoreMessage: (score: number, total: number) => {
      const percentage = (score / total) * 100;
      if (percentage === 100) return "Magnificent! You've mastered the fundamentals of set theory! 🧮";
      if (percentage >= 80) return "Brilliant! Your set theory intuition is purr-fect! ⭐";
      if (percentage >= 60) return "Excellent work! You're well on your way to set theory mastery! 📈";
      return "Keep practicing! Set theory is like organizing a cat's toy collection - it takes time to sort! 🐱";
    },
    getConceptIcon,
    getCorrectMessage: () => "Set-tastic!",
    getIncorrectMessage: () => "Not quite the right set operation."
  };

  return <BaseLesson lesson={lessonData} onComplete={onComplete} onTeaTime={onTeaTime} />;
};

export default SetTheoryLesson;