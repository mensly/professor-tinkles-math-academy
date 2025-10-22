import React from 'react';
import { Network, List, GitBranch } from 'lucide-react';
import { DynamicLessonData } from '../../types/lesson';
import DynamicLesson from './DynamicLesson';

interface DiscreteMathLessonProps {
  onComplete?: (score: number) => void;
  onTeaTime?: () => void;
}

const DiscreteMathLesson: React.FC<DiscreteMathLessonProps> = ({ onComplete, onTeaTime }) => {
  const getConceptIcon = (concept: string) => {
    switch (concept) {
      case 'Permutations': return <List size={32} />;
      case 'Combinations': return <GitBranch size={32} />;
      case 'Logic': return <Network size={32} />;
      case 'Graphs': return <Network size={32} />;
      case 'Counting': return <GitBranch size={32} />;
      default: return <Network size={32} />;
    }
  };

  const lessonData: DynamicLessonData = {
    lessonName: 'discrete-math',
    className: 'discrete-math-lesson',
    questionCount: 5,
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

  return <DynamicLesson lesson={lessonData} onComplete={onComplete} onTeaTime={onTeaTime} />;
};

export default DiscreteMathLesson;