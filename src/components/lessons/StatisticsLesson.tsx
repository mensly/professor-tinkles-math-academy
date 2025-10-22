import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw, Trophy, BarChart3, TrendingUp, PieChart } from 'lucide-react';

interface StatisticsLessonProps {
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

const StatisticsLesson: React.FC<StatisticsLessonProps> = ({ onComplete, onTeaTime }) => {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completed, setCompleted] = useState(false);

  const problems: Problem[] = [
    {
      question: "Lady Pawsington surveyed 8 cats about their daily nap hours: [12, 14, 16, 13, 15, 14, 12, 16]. What is the mean (average) nap time?",
      answer: "14",
      options: ["13", "14", "15", "16"],
      explanation: "To find the mean, add all values and divide by count: (12+14+16+13+15+14+12+16) ÷ 8 = 112 ÷ 8 = 14 hours.",
      concept: "Mean (Average)"
    },
    {
      question: "Professor Tinkles recorded cat weights: [4.2, 4.5, 4.1, 4.8, 4.3, 4.6, 4.4]. What is the median weight?",
      answer: "4.4",
      options: ["4.3", "4.4", "4.5", "4.6"],
      explanation: "Arrange in order: [4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.8]. The median is the middle value: 4.4 kg.",
      concept: "Median"
    },
    {
      question: "Sir Whiskersworth's cats had these tail lengths: [25, 30, 25, 28, 25, 30, 25]. What is the mode?",
      answer: "25",
      options: ["25", "28", "30", "No mode"],
      explanation: "The mode is the most frequent value. 25 appears 4 times, more than any other value, so 25 is the mode.",
      concept: "Mode"
    },
    {
      question: "Inspector Clawson found that 3 out of 10 cats prefer fish over chicken. What is the probability a randomly selected cat prefers fish?",
      answer: "3/10 or 0.3",
      options: ["3/10 or 0.3", "7/10 or 0.7", "1/3 or 0.33", "3/7 or 0.43"],
      explanation: "Probability = favorable outcomes ÷ total outcomes = 3 cats who prefer fish ÷ 10 total cats = 3/10 = 0.3.",
      concept: "Basic Probability"
    },
    {
      question: "Lady Pawsington's data shows cat heights: [20, 22, 24, 26, 28] cm. What is the range?",
      answer: "8",
      options: ["6", "7", "8", "9"],
      explanation: "Range = maximum value - minimum value = 28 - 20 = 8 cm. The range shows the spread of the data.",
      concept: "Range"
    }
  ];

  const getConceptIcon = (concept: string) => {
    switch (concept) {
      case 'Mean (Average)': return <TrendingUp size={32} />;
      case 'Median': return <BarChart3 size={32} />;
      case 'Mode': return <PieChart size={32} />;
      case 'Basic Probability': return <BarChart3 size={32} />;
      case 'Range': return <TrendingUp size={32} />;
      default: return <BarChart3 size={32} />;
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
    if (percentage === 100) return "Purr-fect! You've mastered statistics like a true feline scholar! 📊";
    if (percentage >= 80) return "Brilliant! Your statistical intuition is absolutely pawsome! ⭐";
    if (percentage >= 60) return "Excellent work! You're well on your way to statistical mastery! 📈";
    return "Keep practicing! Statistics is like counting cat treats - it takes time to get it right! 🐱";
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
          <h2>Statistics & Probability Lesson Complete!</h2>
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
      className="statistics-lesson"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="lesson-header">
        <h2>📊 Statistics & Probability with Lady Pawsington</h2>
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
                    {isCorrect ? "Statistically significant!" : "Not quite the right calculation."}
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

export default StatisticsLesson;
