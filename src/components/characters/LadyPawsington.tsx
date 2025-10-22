import React from 'react';
import { Calculator, X, Plus } from 'lucide-react';
import BaseCharacter, { CharacterData } from './BaseCharacter';

interface LadyPawsingtonProps {
  isActive?: boolean;
  onSpeak?: (message: string) => void;
}

const LadyPawsington: React.FC<LadyPawsingtonProps> = ({ isActive = false, onSpeak }) => {
  const characterData: CharacterData = {
    name: "Lady Pawsington",
    title: "Algebra Expert & Witty Scholar",
    imagePath: "/professor-tinkles-math-academy/images/pawsington.jpg",
    altText: "Lady Pawsington - Algebra Expert & Witty Scholar",
    quotes: [
      "Algebra is like a puzzle where every piece fits perfectly - if you know the right moves!",
      "Oh my whiskers! That's a brilliant solution, darling!",
      "In algebra, we don't just find x - we discover the secrets of the mathematical universe!",
      "A lady always solves her equations with grace and a touch of feline elegance.",
      "Why did the algebra book look so sad? Because it had too many problems! *purrs*"
    ],
    traits: [
      "🧮 Equation Solver",
      "💎 Elegant",
      "😸 Witty"
    ],
    actionIcons: [X, Plus],
    mainIcon: Calculator,
    className: "lady-pawsington",
    animationDelay: 0.2
  };

  return <BaseCharacter character={characterData} isActive={isActive} onSpeak={onSpeak} />;
};

export default LadyPawsington;
