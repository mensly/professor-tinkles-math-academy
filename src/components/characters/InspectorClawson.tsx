import React from 'react';
import { Search, SearchCheck, Fingerprint } from 'lucide-react';
import BaseCharacter, { CharacterData } from './BaseCharacter';

interface InspectorClawsonProps {
  isActive?: boolean;
  onSpeak?: (message: string) => void;
}

const InspectorClawson: React.FC<InspectorClawsonProps> = ({ isActive = false, onSpeak }) => {
  const characterData: CharacterData = {
    name: "Inspector Clawson",
    title: "Mathematical Detective & Problem Solver",
    imagePath: "/professor-tinkles-math-academy/images/clawson.jpg",
    altText: "Inspector Clawson - Mathematical Detective & Problem Solver",
    quotes: [
      "Elementary, my dear student! The answer was right under our whiskers all along!",
      "I've solved cases more puzzling than this equation, and I always get my cat!",
      "The game is afoot! Let's deduce the solution step by step, like a proper detective.",
      "Ah-ha! The evidence points to... the quadratic formula! *adjusts detective hat*",
      "In mathematics, as in detective work, every clue leads us closer to the truth!"
    ],
    traits: [
      "🔍 Detective",
      "🧩 Puzzle Solver",
      "🎩 Deductive"
    ],
    actionIcons: [SearchCheck, Fingerprint],
    mainIcon: Search,
    className: "inspector-clawson",
    animationDelay: 0.3
  };

  return <BaseCharacter character={characterData} isActive={isActive} onSpeak={onSpeak} />;
};

export default InspectorClawson;
