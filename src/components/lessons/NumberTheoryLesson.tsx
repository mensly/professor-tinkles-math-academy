import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw, Trophy, Hash, Calculator, Zap } from 'lucide-react';

interface NumberTheoryLessonProps {
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

const NumberTheoryLesson: React.FC<NumberTheoryLessonProps> = ({ onComplete, onTeaTime }) => {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completed, setCompleted] = useState(false);

  const problems: Problem[] = [
    {
      question: "Professor Tinkles wants to know if 17 is a prime number. What is the correct answer?",
      answer: "Yes, 17 is prime",
      options: ["Yes, 17 is prime", "No, 17 is composite", "17 is neither prime nor composite", "Cannot be determined"],
      explanation: "A prime number has exactly two distinct positive divisors: 1 and itself. 17 can only be divided evenly by 1 and 17, so it's prime.",
      concept: "Prime Numbers"
    },
    {
      question: "Sir Whiskersworth has 12 cat treats and 18 fish snacks. What is the GCD (Greatest Common Divisor) of 12 and 18?",
      answer: "6",
      options: ["3", "6", "9", "12"],
      explanation: "Find the largest number that divides both 12 and 18. Factors of 12: 1,2,3,4,6,12. Factors of 18: 1,2,3,6,9,18. The largest common factor is 6.",
      concept: "Greatest Common Divisor (GCD)"
    },
    {
      question: "Lady Pawsington needs to find the LCM of 4 and 6 to organize her cat toys. What is the LCM?",
      answer: "12",
      options: ["8", "10", "12", "24"],
      explanation: "LCM is the smallest number that is a multiple of both numbers. Multiples of 4: 4,8,12,16... Multiples of 6: 6,12,18,24... The smallest common multiple is 12.",
      concept: "Least Common Multiple (LCM)"
    },
    {
      question: "Inspector Clawson is investigating the Fibonacci sequence. What is the 8th Fibonacci number? (Starting with F₁=1, F₂=1)",
      answer: "21",
      options: ["13", "21", "34", "55"],
      explanation: "Fibonacci sequence: 1,1,2,3,5,8,13,21... Each number is the sum of the two preceding numbers. F₈ = F₇ + F₆ = 13 + 8 = 21.",
      concept: "Fibonacci Sequence"
    },
    {
      question: "Professor Tinkles wants to find the prime factorization of 24. What is the correct answer?",
      answer: "2³ × 3",
      options: ["2² × 3", "2³ × 3", "2 × 3²", "2⁴ × 3"],
      explanation: "24 = 2 × 12 = 2 × 2 × 6 = 2 × 2 × 2 × 3 = 2³ × 3. This expresses 24 as a product of prime powers.",
      concept: "Prime Factorization"
    }
  ];

  const getConceptIcon = (concept: string) => {
    switch (concept) {
      case 'Prime Numbers': return <Hash size={32} />;
      case 'Greatest Common Divisor (GCD)': return <Calculator size={32} />;
      case 'Least Common Multiple (LCM)': return <Zap size={32} />;
      case 'Fibonacci Sequence': return <Hash size={32} />;
      case 'Prime Factorization': return <Calculator size={32} />;
      default: return <Hash size={32} />;
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
    if (percentage === 100) return "Magnificent! You've mastered number theory like a true mathematical cat! 🔢";
    if (percentage >= 80) return "Brilliant! Your number theory intuition is absolutely purr-fect! ⭐";
    if (percentage >= 60) return "Excellent work! You're well on your way to number theory mastery! 📈";
    return "Keep practicing! Number theory is like solving a cat puzzle - it takes patience! 🐱";
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
          <h2>Number Theory Lesson Complete!</h2>
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
      className="number-theory-lesson"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="lesson-header">
        <h2>🔢 Number Theory with Professor Tinkles</h2>
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
                    {isCorrect ? "Number-tastic!" : "Not quite the right number theory."}
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

export default NumberTheoryLesson;
