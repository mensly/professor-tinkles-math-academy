import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Coffee, BookOpen } from 'lucide-react';

interface ProfessorTinklesProps {
  isActive?: boolean;
  onSpeak?: (message: string) => void;
}

const ProfessorTinkles: React.FC<ProfessorTinklesProps> = ({ isActive = false, onSpeak }) => {
  const quotes = [
    "Mathematics is not about numbers, equations, computations, or algorithms: it is about understanding.",
    "Ah, another brilliant mind ready to explore the wonders of mathematics!",
    "Tea time is the perfect moment to reflect on the beauty of numbers.",
    "In my academy, we don't just solve problems - we understand them with the wisdom of a thousand cats.",
    "Remember, my dear student, even the most complex equation can be tamed with patience and a good cup of tea."
  ];

  const handleClick = () => {
    if (onSpeak) {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      onSpeak(randomQuote);
    }
  };

  return (
    <motion.div
      className={`professor-tinkles ${isActive ? 'active' : ''}`}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="character-container">
        <div className="character-avatar">
          <img 
            src="/images/tinkles.jpg" 
            alt="Professor Tinkles - Headmaster & Mathematics Scholar"
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
            <GraduationCap size={48} />
          </div>
        </div>
        <div className="character-info">
          <h3>Professor Tinkles</h3>
          <p className="character-title">Headmaster & Mathematics Scholar</p>
          <div className="character-traits">
            <span className="trait">🧠 Brilliant Mind</span>
            <span className="trait">☕ Tea Enthusiast</span>
            <span className="trait">📚 Knowledge Keeper</span>
          </div>
        </div>
        <div className="character-actions">
          <Coffee size={20} className="action-icon" />
          <BookOpen size={20} className="action-icon" />
        </div>
      </div>
    </motion.div>
  );
};

export default ProfessorTinkles;
