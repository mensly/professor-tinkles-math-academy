import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';

interface ArithmeticLessonProps {
  onComplete?: (score: number) => void;
  onTeaTime?: () => void;
}

interface Problem {
  question: string;
  answer: number;
  options: number[];
  explanation: string;
}

const ArithmeticLesson: React.FC<ArithmeticLessonProps> = ({ onComplete, onTeaTime }) => {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completed, setCompleted] = useState(false);

  const problems: Problem[] = [
    {
      question: "Professor Tinkles has 8 teacups. If he breaks 3 during his morning tea ceremony, how many teacups does he have left?",
      answer: 5,
      options: [3, 5, 8, 11],
      explanation: "8 - 3 = 5. Professor Tinkles is quite careful with his remaining teacups!"
    },
    {
      question: "Sir Whiskersworth needs to measure 4 sides of a square. If each side is 3 paws long, what's the total perimeter?",
      answer: 12,
      options: [7, 9, 12, 16],
      explanation: "4 sides × 3 paws = 12 paws. A perfectly measured square, as expected from Sir Whiskersworth!"
    },
    {
      question: "Lady Pawsington has 6 algebra books. She buys 4 more at the cat bookstore. How many books does she have now?",
      answer: 10,
      options: [8, 10, 12, 14],
      explanation: "6 + 4 = 10. Lady Pawsington's library is growing quite nicely!"
    },
    {
      question: "Inspector Clawson found 15 clues in a mathematical mystery. If he solved 9 of them, how many clues remain unsolved?",
      answer: 6,
      options: [4, 6, 9, 15],
      explanation: "15 - 9 = 6. The Inspector is making excellent progress on this case!"
    },
    {
      question: "If Professor Tinkles serves tea to 3 cats and each cat drinks 2 cups, how many cups of tea are served in total?",
      answer: 6,
      options: [5, 6, 8, 9],
      explanation: "3 cats × 2 cups = 6 cups. A proper British tea service for all the feline scholars!"
    }
  ];

  const handleAnswerSelect = (answer: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    const correct = answer === problems[currentProblem].answer;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentProblem < problems.length - 1) {
      setCurrentProblem(currentProblem + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setCompleted(true);
      if (onComplete) {
        onComplete(score);
      }
    }
  };

  const handleRestart = () => {
    setCurrentProblem(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setCompleted(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / problems.length) * 100;
    if (percentage === 100) return "Purr-fect! You're a mathematical genius! 🐱";
    if (percentage >= 80) return "Brilliant work! You've mastered the basics! 🌟";
    if (percentage >= 60) return "Good job! A few more practice sessions and you'll be purr-fect! 📚";
    return "Keep practicing! Even the best mathematicians started somewhere! 💪";
  };

  if (completed) {
    return (
      <motion.div
        className="lesson-complete"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="completion-card">
          <Trophy size={64} className="trophy-icon" />
          <h2>Lesson Complete!</h2>
          <p className="score-message">{getScoreMessage()}</p>
          <div className="score-display">
            <span className="score">{score}</span>
            <span className="total">/ {problems.length}</span>
          </div>
          <div className="completion-actions">
            <button onClick={handleRestart} className="btn-secondary">
              <RotateCcw size={20} />
              Try Again
            </button>
            <button onClick={onTeaTime} className="btn-primary">
              ☕ Tea Time!
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="arithmetic-lesson"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="lesson-header">
        <h2>🐱 Basic Arithmetic with Professor Tinkles</h2>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentProblem + 1) / problems.length) * 100}%` }}
          />
        </div>
        <p className="progress-text">Question {currentProblem + 1} of {problems.length}</p>
      </div>

      <div className="problem-container">
        <motion.div
          key={currentProblem}
          className="problem-card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="problem-question">{problems[currentProblem].question}</h3>
          
          <div className="answer-options">
            {problems[currentProblem].options.map((option, index) => (
              <motion.button
                key={index}
                className={`answer-option ${
                  selectedAnswer === option ? 'selected' : ''
                } ${
                  showResult 
                    ? option === problems[currentProblem].answer 
                      ? 'correct' 
                      : selectedAnswer === option 
                        ? 'incorrect' 
                        : ''
                    : ''
                }`}
                onClick={() => handleAnswerSelect(option)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={showResult}
              >
                {option}
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {showResult && (
              <motion.div
                className="result-feedback"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                  {isCorrect ? (
                    <CheckCircle size={24} className="feedback-icon" />
                  ) : (
                    <XCircle size={24} className="feedback-icon" />
                  )}
                  <span className="feedback-text">
                    {isCorrect ? "Brilliant!" : "Not quite right."}
                  </span>
                </div>
                <p className="explanation">{problems[currentProblem].explanation}</p>
                <button onClick={handleNext} className="btn-primary">
                  {currentProblem < problems.length - 1 ? 'Next Question' : 'Complete Lesson'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ArithmeticLesson;
