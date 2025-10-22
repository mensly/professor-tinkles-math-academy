import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw, Trophy, Triangle, Circle, Square } from 'lucide-react';

interface GeometryLessonProps {
  onComplete?: (score: number) => void;
  onTeaTime?: () => void;
}

interface Problem {
  question: string;
  answer: number;
  options: number[];
  explanation: string;
  shape: string;
}

const GeometryLesson: React.FC<GeometryLessonProps> = ({ onComplete, onTeaTime }) => {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completed, setCompleted] = useState(false);

  const problems: Problem[] = [
    {
      question: "Sir Whiskersworth has a triangular garden with sides of 3, 4, and 5 paws. What is the perimeter?",
      answer: 12,
      options: [7, 10, 12, 15],
      explanation: "Perimeter = 3 + 4 + 5 = 12 paws. A perfectly measured triangle, as expected from Sir Whiskersworth!",
      shape: "triangle"
    },
    {
      question: "Lady Pawsington's circular tea table has a radius of 4 paws. What is the diameter?",
      answer: 8,
      options: [4, 6, 8, 12],
      explanation: "Diameter = 2 × radius = 2 × 4 = 8 paws. A perfectly round table for elegant tea service!",
      shape: "circle"
    },
    {
      question: "Inspector Clawson's square investigation board has sides of 6 paws each. What is the area?",
      answer: 36,
      options: [12, 24, 36, 48],
      explanation: "Area = side × side = 6 × 6 = 36 square paws. Plenty of space for all those clues!",
      shape: "square"
    },
    {
      question: "Professor Tinkles has a rectangular study with length 8 paws and width 5 paws. What is the area?",
      answer: 40,
      options: [13, 26, 40, 50],
      explanation: "Area = length × width = 8 × 5 = 40 square paws. A spacious study for mathematical contemplation!",
      shape: "rectangle"
    },
    {
      question: "A cat's circular scratching post has a circumference of 18.84 paws. What is the radius? (Use π ≈ 3.14)",
      answer: 3,
      options: [2, 3, 4, 6],
      explanation: "Circumference = 2πr, so r = 18.84 ÷ (2 × 3.14) = 3 paws. A perfectly sized scratching post!",
      shape: "circle"
    }
  ];

  const getShapeIcon = (shape: string) => {
    switch (shape) {
      case 'triangle': return <Triangle size={32} />;
      case 'circle': return <Circle size={32} />;
      case 'square': return <Square size={32} />;
      case 'rectangle': return <Square size={32} />;
      default: return <Circle size={32} />;
    }
  };

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
    if (percentage === 100) return "Purr-fect geometry! You're a shape-shifting genius! 🔺";
    if (percentage >= 80) return "Brilliant! Your geometric intuition is spot on! ⭐";
    if (percentage >= 60) return "Good work! A few more angles and you'll be purr-fect! 📐";
    return "Keep practicing! Every great architect started with basic shapes! 🏗️";
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
          <h2>Geometry Lesson Complete!</h2>
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
      className="geometry-lesson"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="lesson-header">
        <h2>📐 Geometry with Sir Whiskersworth</h2>
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
          <div className="shape-display">
            {getShapeIcon(problems[currentProblem].shape)}
          </div>
          
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
                    {isCorrect ? "Precisely measured!" : "Not quite the right angle."}
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

export default GeometryLesson;
