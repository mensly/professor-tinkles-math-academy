import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';
import { loadLessonQuestions, LoadedLesson } from '../../utils/questionLoader';
import { DynamicLessonProps, DifficultyLevel } from '../../types/lesson';
import { getDifficultyStars, getDifficultyColor } from '../../utils/difficultyUtils';

const DynamicLesson: React.FC<DynamicLessonProps> = ({ lesson, onComplete, onTeaTime }) => {
  const [loadedLesson, setLoadedLesson] = useState<LoadedLesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const loadLesson = async () => {
      try {
        setLoading(true);
        const data = await loadLessonQuestions(lesson.lessonName, lesson.questionCount || 5);
        setLoadedLesson(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load lesson');
      } finally {
        setLoading(false);
      }
    };

    loadLesson();
  }, [lesson.lessonName, lesson.questionCount]);

  const handleAnswerSelect = (answer: number) => {
    if (showResult || !loadedLesson) return;
    
    setSelectedAnswer(answer);
    const correct = answer === loadedLesson.problems[currentProblem].answer;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (!loadedLesson) return;
    
    if (currentProblem < loadedLesson.problems.length - 1) {
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

  if (loading) {
    return (
      <div className="lesson-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading lesson questions...</p>
        </div>
      </div>
    );
  }

  if (error || !loadedLesson) {
    return (
      <div className="lesson-error">
        <div className="error-message">
          <h3>Oops! Something went wrong</h3>
          <p>{error || 'Failed to load lesson data'}</p>
          <button onClick={() => window.location.reload()} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
          <h2>{loadedLesson.title} Lesson Complete!</h2>
          <p className="score-message">{lesson.getScoreMessage(score, loadedLesson.problems.length)}</p>
          <div className="score-display">
            <span className="score">{score}</span>
            <span className="total">/ {loadedLesson.problems.length}</span>
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

  const currentProblemData = loadedLesson.problems[currentProblem];

  return (
    <motion.div
      className={lesson.className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="lesson-header">
        <div className="lesson-title-section">
          <h2>{loadedLesson.emoji} {loadedLesson.title} with {loadedLesson.instructor}</h2>
          <div 
            className="difficulty-badge"
            style={{ backgroundColor: getDifficultyColor(loadedLesson.difficulty) }}
          >
            <span className="difficulty-text">{loadedLesson.difficulty.toUpperCase()}</span>
            <div className="difficulty-stars">
              {getDifficultyStars(loadedLesson.difficulty)}
            </div>
          </div>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentProblem + 1) / loadedLesson.problems.length) * 100}%` }}
          />
        </div>
        <p className="progress-text">Question {currentProblem + 1} of {loadedLesson.problems.length}</p>
      </div>

      <div className="problem-container">
        <motion.div
          key={currentProblem}
          className="problem-card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {lesson.getConceptIcon && (
            <div className="concept-display">
              {lesson.getConceptIcon(currentProblemData.concept)}
              <span className="concept-label">{currentProblemData.concept}</span>
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
                    {isCorrect ? lesson.getCorrectMessage(true) : lesson.getIncorrectMessage(false)}
                  </span>
                </div>
                <p className="explanation">{currentProblemData.explanation}</p>
                <button onClick={handleNext} className="btn-primary">
                  {currentProblem < loadedLesson.problems.length - 1 ? 'Next Question' : 'Complete Lesson'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DynamicLesson;
