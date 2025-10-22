import React from 'react';
import { Ruler, Triangle, Circle } from 'lucide-react';
import BaseCharacter, { CharacterData } from './BaseCharacter';

interface SirWhiskersworthProps {
  isActive?: boolean;
  onSpeak?: (message: string) => void;
}

const SirWhiskersworth: React.FC<SirWhiskersworthProps> = ({ isActive = false, onSpeak }) => {
  const characterData: CharacterData = {
    name: "Sir Whiskersworth",
    title: "Geometry Specialist & Gentleman",
    imagePath: "/professor-tinkles-math-academy/images/wiskersworth.jpg",
    altText: "Sir Whiskersworth - Geometry Specialist & Gentleman",
    quotes: [
      "Geometry is the art of seeing the world through perfectly straight lines and elegant curves.",
      "A gentleman's angles are always precisely measured, my dear student.",
      "The circle is the most perfect shape - like a cat curled up for a nap.",
      "In geometry, as in life, precision is everything. No crooked lines in my classroom!",
      "Ah, the triangle! Three sides of pure mathematical elegance. Simply purr-fect!"
    ],
    traits: [
      "📐 Precision Master",
      "🎩 Distinguished",
      "📏 Line Expert"
    ],
    actionIcons: [Triangle, Circle],
    mainIcon: Ruler,
    className: "sir-whiskersworth",
    animationDelay: 0.1
  };

  return <BaseCharacter character={characterData} isActive={isActive} onSpeak={onSpeak} />;
};

export default SirWhiskersworth;
