import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw, Trophy, Calculator, TrendingUp, Zap } from 'lucide-react';

interface CalculusLessonProps {
  onComplete?: (score: number) => void;
  onTeaTime?: () => void;
}

interface Problem {
  question: string;
  answer: number;
  options: number[];
  explanation: string;
  concept: string;
}

const CalculusLesson: React.FC<CalculusLessonProps> = ({ onComplete, onTeaTime }) => {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completed, setCompleted] = useState(false);

  const problems: Problem[] = [
    {
      question: "Professor Tinkles is tracking how fast his cat's tail moves. If the position is f(x) = x², what is the derivative at x = 2?",
      answer: 4,
      options: [2, 4, 6, 8],
      explanation: "The derivative of x² is 2x. At x = 2, the derivative is 2(2) = 4. This tells us how fast the tail is moving!",
      concept: "Basic Derivatives"
    },
    {
      question: "Sir Whiskersworth wants to find the slope of his garden path. If the path is described by f(x) = 3x + 1, what is the slope?",
      answer: 3,
      options: [1, 2, 3, 4],
      explanation: "The derivative of 3x + 1 is 3. The slope of a linear function is constant - Sir Whiskersworth's path has a steady incline!",
      concept: "Linear Derivatives"
    },
    {
      question: "Lady Pawsington is calculating the area under her favorite curve f(x) = x from 0 to 4. What is this area?",
      answer: 8,
      options: [4, 6, 8, 10],
      explanation: "The area under f(x) = x from 0 to 4 is ∫₀⁴ x dx = [x²/2]₀⁴ = 16/2 - 0 = 8. A perfect triangular area!",
      concept: "Basic Integration"
    },
    {
      question: "Inspector Clawson is investigating a case where the rate of change is f'(x) = 2x. If f(0) = 3, what is f(2)?",
      answer: 7,
      options: [5, 6, 7, 8],
      explanation: "Since f'(x) = 2x, we have f(x) = x² + C. With f(0) = 3, we get C = 3. So f(2) = 2² + 3 = 7. Elementary, my dear student!",
      concept: "Antiderivatives"
    },
    {
      question: "Professor Tinkles is studying the rate at which tea cools. If the temperature is T(t) = 80e^(-0.1t), what is the rate of cooling at t = 0?",
      answer: -8,
      options: [-6, -8, -10, -12],
      explanation: "The derivative of 80e^(-0.1t) is 80(-0.1)e^(-0.1t) = -8e^(-0.1t). At t = 0, this gives -8. The tea is cooling at 8 degrees per minute!",
      concept: "Exponential Derivatives"
    }
  ];

  const getConceptIcon = (concept: string) => {
    switch (concept) {
      case 'Basic Derivatives': return <Calculator size={32} />;
      case 'Linear Derivatives': return <TrendingUp size={32} />;
      case 'Basic Integration': return <Zap size={32} />;
      case 'Antiderivatives': return <Calculator size={32} />;
      case 'Exponential Derivatives': return <Zap size={32} />;
      default: return <Calculator size={32} />;
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
    if (percentage === 100) return "Magnificent! You've mastered the fundamentals of calculus! 🧮";
    if (percentage >= 80) return "Brilliant! Your calculus intuition is purr-fect! ⭐";
    if (percentage >= 60) return "Excellent work! You're well on your way to calculus mastery! 📈";
    return "Keep practicing! Calculus is like a good cup of tea - it takes time to steep! ☕";
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
          <h2>Calculus Lesson Complete!</h2>
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
      className="calculus-lesson"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="lesson-header">
        <h2>📊 Calculus with Professor Tinkles</h2>
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
          <div className="concept-display">
            {getConceptIcon(problems[currentProblem].concept)}
            <span className="concept-label">{problems[currentProblem].concept}</span>
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
                    {isCorrect ? "Calculus-tastic!" : "Not quite the right derivative."}
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

export default CalculusLesson;
