import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw, Trophy, Layers, Plus, Minus } from 'lucide-react';

interface SetTheoryLessonProps {
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

const SetTheoryLesson: React.FC<SetTheoryLessonProps> = ({ onComplete, onTeaTime }) => {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completed, setCompleted] = useState(false);

  const problems: Problem[] = [
    {
      question: "Professor Tinkles has a set A = {1, 2, 3, 4} and set B = {3, 4, 5, 6}. What is A ∪ B (A union B)?",
      answer: "{1, 2, 3, 4, 5, 6}",
      options: ["{1, 2, 3, 4, 5, 6}", "{3, 4}", "{1, 2, 5, 6}", "{1, 2, 3, 4}"],
      explanation: "The union A ∪ B contains all elements that are in A OR in B (or both). So we combine all unique elements: {1, 2, 3, 4, 5, 6}.",
      concept: "Set Union"
    },
    {
      question: "Sir Whiskersworth has sets C = {cat, dog, bird} and D = {cat, fish, hamster}. What is C ∩ D (C intersection D)?",
      answer: "{cat}",
      options: ["{cat}", "{cat, dog, bird, fish, hamster}", "{dog, bird, fish, hamster}", "∅ (empty set)"],
      explanation: "The intersection C ∩ D contains only elements that are in BOTH C and D. Only 'cat' appears in both sets, so C ∩ D = {cat}.",
      concept: "Set Intersection"
    },
    {
      question: "Lady Pawsington has set E = {2, 4, 6, 8, 10}. What is the cardinality of set E?",
      answer: "5",
      options: ["4", "5", "6", "10"],
      explanation: "Cardinality is the number of elements in a set. Set E has 5 elements: {2, 4, 6, 8, 10}, so |E| = 5.",
      concept: "Set Cardinality"
    },
    {
      question: "Inspector Clawson is investigating sets F = {red, blue, green} and G = {blue, green, yellow}. What is F - G (F minus G)?",
      answer: "{red}",
      options: ["{red}", "{blue, green}", "{yellow}", "∅ (empty set)"],
      explanation: "F - G contains elements that are in F but NOT in G. Since 'red' is in F but not in G, F - G = {red}.",
      concept: "Set Difference"
    },
    {
      question: "Professor Tinkles has a universal set U = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10} and set H = {2, 4, 6, 8, 10}. What is H' (H complement)?",
      answer: "{1, 3, 5, 7, 9}",
      options: ["{1, 3, 5, 7, 9}", "{2, 4, 6, 8, 10}", "{1, 2, 3, 4, 5}", "∅ (empty set)"],
      explanation: "H' (H complement) contains all elements in the universal set U that are NOT in H. So H' = {1, 3, 5, 7, 9}.",
      concept: "Set Complement"
    }
  ];

  const getConceptIcon = (concept: string) => {
    switch (concept) {
      case 'Set Union': return <Plus size={32} />;
      case 'Set Intersection': return <Minus size={32} />;
      case 'Set Cardinality': return <Layers size={32} />;
      case 'Set Difference': return <Layers size={32} />;
      case 'Set Complement': return <Layers size={32} />;
      default: return <Layers size={32} />;
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
    if (percentage === 100) return "Magnificent! You've mastered the fundamentals of set theory! 🧮";
    if (percentage >= 80) return "Brilliant! Your set theory intuition is purr-fect! ⭐";
    if (percentage >= 60) return "Excellent work! You're well on your way to set theory mastery! 📈";
    return "Keep practicing! Set theory is like organizing a cat's toy collection - it takes time to sort! 🐱";
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
          <h2>Set Theory Lesson Complete!</h2>
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
      className="set-theory-lesson"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="lesson-header">
        <h2>📊 Set Theory with Professor Tinkles</h2>
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
                    {isCorrect ? "Set-tastic!" : "Not quite the right set operation."}
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

export default SetTheoryLesson;
