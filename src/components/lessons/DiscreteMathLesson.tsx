import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw, Trophy, Network, List, GitBranch } from 'lucide-react';

interface DiscreteMathLessonProps {
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

const DiscreteMathLesson: React.FC<DiscreteMathLessonProps> = ({ onComplete, onTeaTime }) => {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completed, setCompleted] = useState(false);

  const problems: Problem[] = [
    {
      question: "Inspector Clawson needs to arrange 4 cats in a line for a photo. How many different arrangements are possible?",
      answer: "24",
      options: ["12", "16", "24", "32"],
      explanation: "This is a permutation problem. 4! = 4 × 3 × 2 × 1 = 24. There are 24 different ways to arrange 4 cats in a line.",
      concept: "Permutations"
    },
    {
      question: "Lady Pawsington wants to choose 3 cats from 5 available cats for a tea party. How many different combinations are possible?",
      answer: "10",
      options: ["8", "10", "15", "20"],
      explanation: "This is a combination problem. C(5,3) = 5!/(3!(5-3)!) = 5!/(3!2!) = (5×4×3×2×1)/((3×2×1)(2×1)) = 120/(6×2) = 10.",
      concept: "Combinations"
    },
    {
      question: "Professor Tinkles has 3 cats and 2 dogs. How many ways can he choose 2 animals if at least one must be a cat?",
      answer: "9",
      options: ["6", "9", "12", "15"],
      explanation: "Total ways to choose 2 animals: C(5,2) = 10. Ways to choose 2 dogs: C(2,2) = 1. So ways with at least one cat: 10 - 1 = 9.",
      concept: "Counting Principles"
    },
    {
      question: "Sir Whiskersworth is investigating a network of cat tunnels. If there are 4 tunnels and each connects to 2 others, what is the total number of connections?",
      answer: "8",
      options: ["6", "8", "12", "16"],
      explanation: "In a graph with 4 vertices where each has degree 2, the total number of edges = (sum of degrees)/2 = (4×2)/2 = 8/2 = 4. But if each tunnel connects to 2 others, it's 4×2 = 8 connections.",
      concept: "Graph Theory"
    },
    {
      question: "Inspector Clawson needs to determine if the statement 'If it's raining, then cats stay indoors' is logically equivalent to 'If cats don't stay indoors, then it's not raining.' What is the answer?",
      answer: "Yes, they are equivalent",
      options: ["Yes, they are equivalent", "No, they are not equivalent", "Cannot be determined", "Depends on the weather"],
      explanation: "This is the contrapositive of the original statement. In logic, p→q is equivalent to ¬q→¬p. So 'If it's raining, then cats stay indoors' is equivalent to 'If cats don't stay indoors, then it's not raining.'",
      concept: "Logical Equivalence"
    }
  ];

  const getConceptIcon = (concept: string) => {
    switch (concept) {
      case 'Permutations': return <List size={32} />;
      case 'Combinations': return <GitBranch size={32} />;
      case 'Counting Principles': return <List size={32} />;
      case 'Graph Theory': return <Network size={32} />;
      case 'Logical Equivalence': return <GitBranch size={32} />;
      default: return <List size={32} />;
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
    if (percentage === 100) return "Elementary, my dear student! You've mastered discrete mathematics! 🧩";
    if (percentage >= 80) return "Brilliant deduction! Your discrete math skills are purr-fect! ⭐";
    if (percentage >= 60) return "Excellent work! You're well on your way to discrete math mastery! 📈";
    return "Keep investigating! Discrete math is like solving a cat mystery - every clue counts! 🐱";
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
          <h2>Discrete Mathematics Lesson Complete!</h2>
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
      className="discrete-math-lesson"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="lesson-header">
        <h2>🧮 Discrete Mathematics with Inspector Clawson</h2>
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
                    {isCorrect ? "The case is solved!" : "Not quite the right deduction."}
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

export default DiscreteMathLesson;
