import React from 'react';
import { Network, List, GitBranch } from 'lucide-react';
import BaseLesson, { LessonData, Problem } from './BaseLesson';

interface DiscreteMathLessonProps {
  onComplete?: (score: number) => void;
  onTeaTime?: () => void;
}

const DiscreteMathLesson: React.FC<DiscreteMathLessonProps> = ({ onComplete, onTeaTime }) => {
  const problems: Problem[] = [
    {
      question: "Inspector Clawson has 3 different hats and 4 different coats. How many different hat-coat combinations can he wear?",
      answer: 12,
      options: [7, 12, 16, 24],
      explanation: "Using the multiplication principle: 3 hats × 4 coats = 12 different combinations. Each hat can be paired with each coat.",
      concept: "Counting Principles"
    },
    {
      question: "Professor Tinkles wants to arrange 4 books on a shelf. How many different arrangements are possible?",
      answer: 24,
      options: [12, 16, 24, 32],
      explanation: "This is 4! (4 factorial) = 4 × 3 × 2 × 1 = 24. Each position can be filled by any remaining book.",
      concept: "Permutations"
    },
    {
      question: "Lady Pawsington needs to choose 2 cats from 5 available cats for a tea party. How many different groups can she form?",
      answer: 10,
      options: [8, 10, 12, 20],
      explanation: "This is C(5,2) = 5!/(2!×3!) = (5×4)/(2×1) = 10. Order doesn't matter in combinations.",
      concept: "Combinations"
    },
    {
      question: "Sir Whiskersworth is drawing a graph with 4 vertices. What is the maximum number of edges possible?",
      answer: 6,
      options: [4, 6, 8, 12],
      explanation: "In a complete graph with n vertices, the maximum edges = n(n-1)/2. For 4 vertices: 4×3/2 = 6 edges.",
      concept: "Graph Theory"
    },
    {
      question: "A cat can move 1 step up or 1 step right. How many paths are there from bottom-left to top-right of a 3×3 grid?",
      answer: 6,
      options: [4, 6, 8, 9],
      explanation: "This is C(4,2) = 6. We need 2 right moves and 2 up moves in any order: R-R-U-U, R-U-R-U, R-U-U-R, U-R-R-U, U-R-U-R, U-U-R-R.",
      concept: "Lattice Paths"
    }
  ];

  const getConceptIcon = (concept: string) => {
    switch (concept) {
      case 'Counting Principles': return <List size={32} />;
      case 'Permutations': return <GitBranch size={32} />;
      case 'Combinations': return <Network size={32} />;
      case 'Graph Theory': return <Network size={32} />;
      case 'Lattice Paths': return <GitBranch size={32} />;
      default: return <Network size={32} />;
    }
  };

  const lessonData: LessonData = {
    title: "Discrete Mathematics",
    instructor: "Inspector Clawson",
    emoji: "🔗",
    className: "discrete-math-lesson",
    difficulty: "advanced",
    problems,
    getScoreMessage: (score: number, total: number) => {
      const percentage = (score / total) * 100;
      if (percentage === 100) return "Elementary, my dear student! You've solved the case of discrete mathematics! 🕵️";
      if (percentage >= 80) return "Brilliant deduction! Your combinatorial skills are purr-fect! ⭐";
      if (percentage >= 60) return "Good work! A few more clues and you'll crack the case! 🔍";
      return "Keep investigating! Every great detective started with basic counting! 🕵️‍♂️";
    },
    getConceptIcon,
    getCorrectMessage: () => "Elementary, my dear student!",
    getIncorrectMessage: () => "The game is afoot - let's try again!"
  };

  return <BaseLesson lesson={lessonData} onComplete={onComplete} onTeaTime={onTeaTime} />;
};

export default DiscreteMathLesson;