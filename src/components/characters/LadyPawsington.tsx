import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, X, Plus } from 'lucide-react';

interface LadyPawsingtonProps {
  isActive?: boolean;
  onSpeak?: (message: string) => void;
}

const LadyPawsington: React.FC<LadyPawsingtonProps> = ({ isActive = false, onSpeak }) => {
  const quotes = [
    "Algebra is like a puzzle where every piece fits perfectly - if you know the right moves!",
    "Oh my whiskers! That's a brilliant solution, darling!",
    "In algebra, we don't just find x - we discover the secrets of the mathematical universe!",
    "A lady always solves her equations with grace and a touch of feline elegance.",
    "Why did the algebra book look so sad? Because it had too many problems! *purrs*"
  ];

  const handleClick = () => {
    if (onSpeak) {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      onSpeak(randomQuote);
    }
  };

  return (
    <motion.div
      className={`lady-pawsington ${isActive ? 'active' : ''}`}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="character-container">
        <div className="character-avatar">
          <img 
            src="/images/pawsington.jpg" 
            alt="Lady Pawsington - Algebra Expert & Witty Scholar"
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
            <Calculator size={48} />
          </div>
        </div>
        <div className="character-info">
          <h3>Lady Pawsington</h3>
          <p className="character-title">Algebra Expert & Witty Scholar</p>
          <div className="character-traits">
            <span className="trait">🧮 Equation Solver</span>
            <span className="trait">💎 Elegant</span>
            <span className="trait">😸 Witty</span>
          </div>
        </div>
        <div className="character-actions">
          <X size={20} className="action-icon" />
          <Plus size={20} className="action-icon" />
        </div>
      </div>
    </motion.div>
  );
};

export default LadyPawsington;
