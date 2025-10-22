import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw, Trophy, Star } from 'lucide-react';

export interface Problem {
  question: string;
  answer: number;
  options: number[];
  explanation: string;
  concept?: string;
  shape?: string;
  [key: string]: any; // Allow for additional custom properties
}

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface LessonData {
  title: string;
  instructor: string;
  emoji: string;
  className: string;
  difficulty: DifficultyLevel;
  problems: Problem[];
  getScoreMessage: (score: number, total: number) => string;
  getConceptIcon?: (concept: string) => React.ReactNode;
  getShapeIcon?: (shape: string) => React.ReactNode;
  getCorrectMessage: (isCorrect: boolean) => string;
  getIncorrectMessage: (isCorrect: boolean) => string;
}

export interface BaseLessonProps {
  lesson: LessonData;
  onComplete?: (score: number) => void;
  onTeaTime?: () => void;
}

const BaseLesson: React.FC<BaseLessonProps> = ({ lesson, onComplete, onTeaTime }) => {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completed, setCompleted] = useState(false);

  const getDifficultyStars = (difficulty: DifficultyLevel) => {
    const starCount = {
      'beginner': 1,
      'intermediate': 2,
      'advanced': 3,
      'expert': 4
    }[difficulty];

    return Array.from({ length: starCount }, (_, i) => (
      <Star key={i} size={16} className="difficulty-star" />
    ));
  };

  const getDifficultyColor = (difficulty: DifficultyLevel) => {
    const colors = {
      'beginner': '#4ade80', // green
      'intermediate': '#fbbf24', // yellow
      'advanced': '#f97316', // orange
      'expert': '#ef4444' // red
    };
    return colors[difficulty];
  };

  const handleAnswerSelect = (answer: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    const correct = answer === lesson.problems[currentProblem].answer;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentProblem < lesson.problems.length - 1) {
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
    return lesson.getScoreMessage(score, lesson.problems.length);
  };

  const getCorrectMessage = () => {
    return lesson.getCorrectMessage(isCorrect);
  };

  const getIncorrectMessage = () => {
    return lesson.getIncorrectMessage(isCorrect);
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
          <h2>{lesson.title} Complete!</h2>
          <p className="score-message">{getScoreMessage()}</p>
          <div className="score-display">
            <span className="score">{score}</span>
            <span className="total">/ {lesson.problems.length}</span>
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

  const currentProblemData = lesson.problems[currentProblem];

  return (
    <motion.div
      className={lesson.className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="lesson-header">
        <div className="lesson-title-section">
          <h2>{lesson.emoji} {lesson.title} with {lesson.instructor}</h2>
          <div 
            className="difficulty-badge"
            style={{ backgroundColor: getDifficultyColor(lesson.difficulty) }}
          >
            <span className="difficulty-text">{lesson.difficulty.toUpperCase()}</span>
            <div className="difficulty-stars">
              {getDifficultyStars(lesson.difficulty)}
            </div>
          </div>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentProblem + 1) / lesson.problems.length) * 100}%` }}
          />
        </div>
        <p className="progress-text">Question {currentProblem + 1} of {lesson.problems.length}</p>
      </div>

      <div className="problem-container">
        <motion.div
          key={currentProblem}
          className="problem-card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Concept Display (for lessons that have concepts) */}
          {currentProblemData.concept && lesson.getConceptIcon && (
            <div className="concept-display">
              {lesson.getConceptIcon(currentProblemData.concept)}
              <span className="concept-label">{currentProblemData.concept}</span>
            </div>
          )}

          {/* Shape Display (for geometry lessons) */}
          {currentProblemData.shape && lesson.getShapeIcon && (
            <div className="shape-display">
              {lesson.getShapeIcon(currentProblemData.shape)}
            </div>
          )}
          
          <h3 className="problem-question">{currentProblemData.question}</h3>
          
          <div className="answer-options">
            {currentProblemData.options.map((option, index) => (
              <motion.button
                key={index}
                className={`answer-option ${
                  selectedAnswer === option ? 'selected' : ''
                } ${
                  showResult 
                    ? option === currentProblemData.answer 
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
                    {isCorrect ? getCorrectMessage() : getIncorrectMessage()}
                  </span>
                </div>
                <p className="explanation">{currentProblemData.explanation}</p>
                <button onClick={handleNext} className="btn-primary">
                  {currentProblem < lesson.problems.length - 1 ? 'Next Question' : 'Complete Lesson'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BaseLesson;
