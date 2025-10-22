import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Clock, Heart, Sparkles } from 'lucide-react';

interface TeaTimeBreakProps {
  onContinue?: () => void;
  duration?: number; // in seconds
}

const TeaTimeBreak: React.FC<TeaTimeBreakProps> = ({ onContinue, duration = 30 }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [showMessage, setShowMessage] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const britishQuotes = [
    "Tea time is the perfect moment to reflect on mathematical beauty.",
    "A proper cup of tea can solve any mathematical conundrum!",
    "In Britain, we believe that tea makes everything better - including math!",
    "Professor Tinkles always says: 'Tea first, equations second!'",
    "Even the most complex problems seem simpler after a good cuppa!",
    "The British Empire was built on tea and mathematics!",
    "A mathematician's best friend is a warm cup of Earl Grey.",
    "Tea time: when even cats pause to appreciate the finer things in life."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (onContinue) onContinue();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onContinue]);

  useEffect(() => {
    const messageTimer = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % britishQuotes.length);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }, 5000);

    return () => clearInterval(messageTimer);
  }, [britishQuotes.length]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      className="tea-time-break"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="tea-time-container">
        <motion.div
          className="tea-cup"
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Coffee size={80} className="tea-icon" />
          <motion.div
            className="steam"
            animate={{ 
              opacity: [0, 1, 0],
              y: [0, -20, -40]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="steam-line"></div>
            <div className="steam-line"></div>
            <div className="steam-line"></div>
          </motion.div>
        </motion.div>

        <div className="tea-time-content">
          <h2>☕ Tea Time Break</h2>
          <p className="tea-time-subtitle">
            A proper British tradition for mathematical minds
          </p>

          <div className="timer-display">
            <Clock size={24} />
            <span className="time-left">{formatTime(timeLeft)}</span>
          </div>

          <div className="tea-time-tips">
            <h3>Tea Time Tips from Professor Tinkles:</h3>
            <ul>
              <li>☕ Always use loose leaf tea for the best flavor</li>
              <li>🍪 A biscuit or two never hurt anyone</li>
              <li>📚 Perfect time to review your mathematical notes</li>
              <li>🐱 Even cats appreciate a good tea ceremony</li>
            </ul>
          </div>

          <div className="british-facts">
            <h3>Did You Know?</h3>
            <p>
              The British drink 165 million cups of tea every day! 
              That's enough tea to fill 20 Olympic-sized swimming pools! 🏊‍♂️
            </p>
          </div>

          <button 
            onClick={onContinue} 
            className="continue-button"
            disabled={timeLeft > 0}
          >
            {timeLeft > 0 ? `Continue in ${formatTime(timeLeft)}` : 'Continue Learning'}
          </button>
        </div>

        <AnimatePresence>
          {showMessage && (
            <motion.div
              className="tea-time-message"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <Heart size={20} />
              <p>{britishQuotes[messageIndex]}</p>
              <Sparkles size={16} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TeaTimeBreak;
