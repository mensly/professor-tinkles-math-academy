import React from 'react';
import { Star } from 'lucide-react';
import { DifficultyLevel } from '../types/lesson';

export const getDifficultyStars = (difficulty: DifficultyLevel) => {
  const starCount = {
    'beginner': 1,
    'intermediate': 2,
    'advanced': 3,
    'expert': 4
  }[difficulty];

  return Array.from({ length: starCount }, (_, i) => (
    <Star key={i} size={16} className="difficulty-star" />
  ));
};

export const getDifficultyColor = (difficulty: DifficultyLevel) => {
  const colors = {
    'beginner': '#4ade80', // green
    'intermediate': '#fbbf24', // yellow
    'advanced': '#f97316', // orange
    'expert': '#ef4444' // red
  };
  return colors[difficulty];
};
