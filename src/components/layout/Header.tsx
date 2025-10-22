import React from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onHomeClick }) => {
  return (
    <header className="app-header">
      <motion.div
        className="academy-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Professor Tinkles' Math Academy</h1>
        <p className="academy-subtitle">
          A place where numbers dance and equations purr
        </p>
      </motion.div>
      
      {currentView !== 'home' && (
        <motion.button
          className="home-button"
          onClick={onHomeClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          <Home size={20} />
          Back to Academy
        </motion.button>
      )}
    </header>
  );
};

export default Header;
