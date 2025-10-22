import React from 'react';
import DynamicLesson from './DynamicLesson';
import { DynamicLessonData } from '../../types/lesson';

interface ProbabilityLessonProps {
  onComplete?: (score: number) => void;
  onTeaTime?: () => void;
}

const ProbabilityLesson: React.FC<ProbabilityLessonProps> = ({
  onComplete,
  onTeaTime
}) => {
  const lessonData: DynamicLessonData = {
    lessonName: 'probability',
    className: 'probability-lesson',
    questionCount: 5,
    getScoreMessage: (score: number, total: number) => {
      const percentage = (score / total) * 100;
      if (percentage === 100) return "Purr-fect! You've mastered probability! 🎲";
      if (percentage >= 80) return "Excellent work! You understand probability very well! 🎯";
      if (percentage >= 60) return "Good job! Keep practicing with probability! 📊";
      return "Don't worry! Probability takes time to master. Keep trying! 🎪";
    },
    getConceptIcon: (concept: string) => {
      const icons: { [key: string]: string } = {
        'Basic Probability': '🎲',
        'Combinations': '🔢',
        'Conditional Probability': '🔍',
        'Expected Value': '💰',
        'Games': '🎮'
      };
      return icons[concept] || '📚';
    },
    getCorrectMessage: (isCorrect: boolean) => {
      if (isCorrect) {
        return "Excellent! You've calculated the probability correctly!";
      }
      return "Not quite! Remember to count all possible outcomes.";
    },
    getIncorrectMessage: (isCorrect: boolean) => {
      if (isCorrect) {
        return "Purr-fect probability! You're a natural at chance and odds!";
      }
      return "Don't worry! Probability takes practice. Keep working with combinations!";
    }
  };

  return (
    <DynamicLesson 
      lesson={lessonData}
      onComplete={onComplete}
      onTeaTime={onTeaTime}
    />
  );
};

export default ProbabilityLesson;
