import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface CharacterMessageProps {
  show: boolean;
  message: string;
}

const CharacterMessage: React.FC<CharacterMessageProps> = ({ show, message }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="character-message"
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <MessageCircle size={24} />
          <p>{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CharacterMessage;
