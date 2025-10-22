import React from 'react';
import { GraduationCap, Coffee, BookOpen } from 'lucide-react';
import BaseCharacter, { CharacterData } from './BaseCharacter';

interface ProfessorTinklesProps {
  isActive?: boolean;
  onSpeak?: (message: string) => void;
}

const ProfessorTinkles: React.FC<ProfessorTinklesProps> = ({ isActive = false, onSpeak }) => {
  const characterData: CharacterData = {
    name: "Professor Tinkles",
    title: "Headmaster & Mathematics Scholar",
    imagePath: "/professor-tinkles-math-academy/images/tinkles.jpg",
    altText: "Professor Tinkles - Headmaster & Mathematics Scholar",
    quotes: [
      "Mathematics is not about numbers, equations, computations, or algorithms: it is about understanding.",
      "Ah, another brilliant mind ready to explore the wonders of mathematics!",
      "Tea time is the perfect moment to reflect on the beauty of numbers.",
      "In my academy, we don't just solve problems - we understand them with the wisdom of a thousand cats.",
      "Remember, my dear student, even the most complex equation can be tamed with patience and a good cup of tea."
    ],
    traits: [
      "🧠 Brilliant Mind",
      "☕ Tea Enthusiast", 
      "📚 Knowledge Keeper"
    ],
    actionIcons: [Coffee, BookOpen],
    mainIcon: GraduationCap,
    className: "professor-tinkles",
    animationDelay: 0
  };

  return <BaseCharacter character={characterData} isActive={isActive} onSpeak={onSpeak} />;
};

export default ProfessorTinkles;
