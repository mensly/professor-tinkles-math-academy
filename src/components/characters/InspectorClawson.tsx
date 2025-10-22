import React from 'react';
import { motion } from 'framer-motion';
import { Search, SearchCheck, Fingerprint } from 'lucide-react';

interface InspectorClawsonProps {
  isActive?: boolean;
  onSpeak?: (message: string) => void;
}

const InspectorClawson: React.FC<InspectorClawsonProps> = ({ isActive = false, onSpeak }) => {
  const quotes = [
    "Elementary, my dear student! The answer was right under our whiskers all along!",
    "I've solved cases more puzzling than this equation, and I always get my cat!",
    "The game is afoot! Let's deduce the solution step by step, like a proper detective.",
    "Ah-ha! The evidence points to... the quadratic formula! *adjusts detective hat*",
    "In mathematics, as in detective work, every clue leads us closer to the truth!"
  ];

  const handleClick = () => {
    if (onSpeak) {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      onSpeak(randomQuote);
    }
  };

  return (
    <motion.div
      className={`inspector-clawson ${isActive ? 'active' : ''}`}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="character-container">
        <div className="character-avatar">
          <img 
            src="/images/clawson.jpg" 
            alt="Inspector Clawson - Mathematical Detective & Problem Solver"
            className="cat-portrait"
            onError={(e) => {
              // Fallback to icon if image fails to load
              e.currentTarget.style.display = 'none';
              const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
              if (nextElement) {
                nextElement.style.display = 'flex';
              }
            }}
          />
          <div className="character-icon" style={{ display: 'none' }}>
            <Search size={48} />
          </div>
        </div>
        <div className="character-info">
          <h3>Inspector Clawson</h3>
          <p className="character-title">Mathematical Detective & Problem Solver</p>
          <div className="character-traits">
            <span className="trait">🔍 Detective</span>
            <span className="trait">🧩 Puzzle Solver</span>
            <span className="trait">🎩 Deductive</span>
          </div>
        </div>
        <div className="character-actions">
          <SearchCheck size={20} className="action-icon" />
          <Fingerprint size={20} className="action-icon" />
        </div>
      </div>
    </motion.div>
  );
};

export default InspectorClawson;
