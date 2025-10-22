import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

export interface CharacterData {
  name: string;
  title: string;
  imagePath: string;
  altText: string;
  quotes: string[];
  traits: string[];
  actionIcons: LucideIcon[];
  mainIcon: LucideIcon;
  className: string;
  animationDelay?: number;
}

export interface BaseCharacterProps {
  character: CharacterData;
  isActive?: boolean;
  onSpeak?: (message: string) => void;
}

const BaseCharacter: React.FC<BaseCharacterProps> = ({ 
  character, 
  isActive = false, 
  onSpeak 
}) => {
  const handleClick = () => {
    if (onSpeak) {
      const randomQuote = character.quotes[Math.floor(Math.random() * character.quotes.length)];
      onSpeak(randomQuote);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Fallback to icon if image fails to load
    e.currentTarget.style.display = 'none';
    const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
    if (nextElement) {
      nextElement.style.display = 'flex';
    }
  };

  const MainIcon = character.mainIcon;

  return (
    <motion.div
      className={`${character.className} ${isActive ? 'active' : ''}`}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: character.animationDelay || 0 }}
    >
      <div className="character-container">
        <div className="character-avatar">
          <img 
            src={character.imagePath}
            alt={character.altText}
            className="cat-portrait"
            onError={handleImageError}
          />
          <div className="character-icon" style={{ display: 'none' }}>
            <MainIcon size={48} />
          </div>
        </div>
        <div className="character-info">
          <h3>{character.name}</h3>
          <p className="character-title">{character.title}</p>
          <div className="character-traits">
            {character.traits.map((trait, index) => (
              <span key={index} className="trait">{trait}</span>
            ))}
          </div>
        </div>
        <div className="character-actions">
          {character.actionIcons.map((ActionIcon, index) => (
            <ActionIcon key={index} size={20} className="action-icon" />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BaseCharacter;
