import React from 'react';
import { motion } from 'framer-motion';
import { Ruler, Triangle, Circle } from 'lucide-react';

interface SirWhiskersworthProps {
  isActive?: boolean;
  onSpeak?: (message: string) => void;
}

const SirWhiskersworth: React.FC<SirWhiskersworthProps> = ({ isActive = false, onSpeak }) => {
  const quotes = [
    "Geometry is the art of seeing the world through perfectly straight lines and elegant curves.",
    "A gentleman's angles are always precisely measured, my dear student.",
    "The circle is the most perfect shape - like a cat curled up for a nap.",
    "In geometry, as in life, precision is everything. No crooked lines in my classroom!",
    "Ah, the triangle! Three sides of pure mathematical elegance. Simply purr-fect!"
  ];

  const handleClick = () => {
    if (onSpeak) {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      onSpeak(randomQuote);
    }
  };

  return (
    <motion.div
      className={`sir-whiskersworth ${isActive ? 'active' : ''}`}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="character-container">
        <div className="character-avatar">
          <img 
            src="/images/wiskersworth.jpg" 
            alt="Sir Whiskersworth - Geometry Specialist & Gentleman"
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
            <Ruler size={48} />
          </div>
        </div>
        <div className="character-info">
          <h3>Sir Whiskersworth</h3>
          <p className="character-title">Geometry Specialist & Gentleman</p>
          <div className="character-traits">
            <span className="trait">📐 Precision Master</span>
            <span className="trait">🎩 Distinguished</span>
            <span className="trait">📏 Line Expert</span>
          </div>
        </div>
        <div className="character-actions">
          <Triangle size={20} className="action-icon" />
          <Circle size={20} className="action-icon" />
        </div>
      </div>
    </motion.div>
  );
};

export default SirWhiskersworth;
