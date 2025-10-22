import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw, Trophy, Circle, Triangle, TrendingUp } from 'lucide-react';

interface TrigonometryLessonProps {
  onComplete?: (score: number) => void;
  onTeaTime?: () => void;
}

interface Problem {
  question: string;
  answer: string;
  options: string[];
  explanation: string;
  concept: string;
}

const TrigonometryLesson: React.FC<TrigonometryLessonProps> = ({ onComplete, onTeaTime }) => {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completed, setCompleted] = useState(false);

  const problems: Problem[] = [
    {
      question: "Sir Whiskersworth's cat is sitting 3 meters from a tree and looking up at a bird 4 meters high. What is the tangent of the angle of elevation?",
      answer: "4/3",
      options: ["3/4", "4/3", "3/5", "4/5"],
      explanation: "In a right triangle, tan(θ) = opposite/adjacent. The opposite side is 4m (height) and adjacent side is 3m (distance), so tan(θ) = 4/3.",
      concept: "Tangent Ratio"
    },
    {
      question: "Lady Pawsington's cat tower has a height of 5 meters and forms a 30° angle with the ground. What is the length of the ramp?",
      answer: "10 meters",
      options: ["5 meters", "8.66 meters", "10 meters", "12 meters"],
      explanation: "Using sine: sin(30°) = opposite/hypotenuse = 5/h. Since sin(30°) = 1/2, we have 1/2 = 5/h, so h = 10 meters.",
      concept: "Sine Ratio"
    },
    {
      question: "Professor Tinkles wants to find cos(60°). What is the correct value?",
      answer: "1/2 or 0.5",
      options: ["√3/2", "1/2", "√2/2", "1"],
      explanation: "In a 30-60-90 triangle, cos(60°) = adjacent/hypotenuse. For a triangle with sides 1, √3, 2, cos(60°) = 1/2 = 0.5.",
      concept: "Cosine Ratio"
    },
    {
      question: "Inspector Clawson is investigating a cat's jump. If the cat jumps at a 45° angle with initial velocity v, what is the horizontal component of velocity?",
      answer: "v/√2",
      options: ["v/2", "v/√2", "v√2", "v"],
      explanation: "For a 45° angle, the horizontal component is v × cos(45°). Since cos(45°) = √2/2, the horizontal component is v × √2/2 = v/√2.",
      concept: "Vector Components"
    },
    {
      question: "Sir Whiskersworth's cat is walking in a circle with radius 2 meters. What is the circumference of the path?",
      answer: "4π meters",
      options: ["2π meters", "4π meters", "8π meters", "16π meters"],
      explanation: "Circumference = 2πr = 2π × 2 = 4π meters. This gives the total distance the cat walks in one complete circle.",
      concept: "Circle Properties"
    }
  ];

  const getConceptIcon = (concept: string) => {
    switch (concept) {
      case 'Tangent Ratio': return <Triangle size={32} />;
      case 'Sine Ratio': return <Circle size={32} />;
      case 'Cosine Ratio': return <Triangle size={32} />;
      case 'Vector Components': return <TrendingUp size={32} />;
      case 'Circle Properties': return <Circle size={32} />;
      default: return <Triangle size={32} />;
    }
  };

  const handleAnswerSelect = (answer: string) => {
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
    if (percentage === 100) return "Magnificent! You've mastered trigonometry with the precision of a cat's whiskers! 📐";
    if (percentage >= 80) return "Brilliant! Your trigonometric intuition is absolutely purr-fect! ⭐";
    if (percentage >= 60) return "Excellent work! You're well on your way to trigonometric mastery! 📈";
    return "Keep practicing! Trigonometry is like measuring a cat's perfect landing angle! 🐱";
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
          <h2>Trigonometry Lesson Complete!</h2>
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
      className="trigonometry-lesson"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="lesson-header">
        <h2>📐 Trigonometry with Sir Whiskersworth</h2>
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
                    {isCorrect ? "Angle-tastic!" : "Not quite the right angle."}
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

export default TrigonometryLesson;
