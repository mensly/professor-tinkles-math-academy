import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfessorTinkles from './characters/ProfessorTinkles';
import SirWhiskersworth from './characters/SirWhiskersworth';
import LadyPawsington from './characters/LadyPawsington';
import InspectorClawson from './characters/InspectorClawson';
import ArithmeticLesson from './lessons/ArithmeticLesson';
import GeometryLesson from './lessons/GeometryLesson';
import CalculusLesson from './lessons/CalculusLesson';
import SetTheoryLesson from './lessons/SetTheoryLesson';
import StatisticsLesson from './lessons/StatisticsLesson';
import NumberTheoryLesson from './lessons/NumberTheoryLesson';
import DiscreteMathLesson from './lessons/DiscreteMathLesson';
import TrigonometryLesson from './lessons/TrigonometryLesson';
import TeaTimeBreak from './ui/TeaTimeBreak';
import AchievementSystem from './ui/AchievementSystem';
import { MessageCircle, Coffee, Trophy, Home, Calculator, Triangle, Zap, Layers, BarChart3, Hash, Network, Circle } from 'lucide-react';

const App: React.FC = () => {
  const [activeCharacter] = useState<string | null>(null);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [showMessage, setShowMessage] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'arithmetic' | 'geometry' | 'calculus' | 'set-theory' | 'statistics' | 'number-theory' | 'discrete-math' | 'trigonometry' | 'tea-time' | 'achievements'>('home');
  const [lessonsCompleted, setLessonsCompleted] = useState(0);
  const [perfectScores, setPerfectScores] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const handleCharacterSpeak = (message: string) => {
    setCurrentMessage(message);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 4000);
  };

  const handleLessonComplete = (score: number) => {
    setLessonsCompleted(prev => prev + 1);
    setTotalScore(prev => prev + score);
    if (score === 5) { // Assuming 5 questions per lesson
      setPerfectScores(prev => prev + 1);
    }
  };

  const handleTeaTime = () => {
    setCurrentView('tea-time');
  };

  const handleContinueFromTeaTime = () => {
    setCurrentView('home');
  };

  const characters = [
    { id: 'professor', component: ProfessorTinkles, name: 'Professor Tinkles' },
    { id: 'sir-whiskersworth', component: SirWhiskersworth, name: 'Sir Whiskersworth' },
    { id: 'lady-pawsington', component: LadyPawsington, name: 'Lady Pawsington' },
    { id: 'inspector', component: InspectorClawson, name: 'Inspector Clawson' }
  ];

  const renderCurrentView = () => {
    switch (currentView) {
      case 'arithmetic':
        return (
          <ArithmeticLesson 
            onComplete={handleLessonComplete}
            onTeaTime={handleTeaTime}
          />
        );
      case 'geometry':
        return (
          <GeometryLesson 
            onComplete={handleLessonComplete}
            onTeaTime={handleTeaTime}
          />
        );
      case 'calculus':
        return (
          <CalculusLesson 
            onComplete={handleLessonComplete}
            onTeaTime={handleTeaTime}
          />
        );
      case 'set-theory':
        return (
          <SetTheoryLesson 
            onComplete={handleLessonComplete}
            onTeaTime={handleTeaTime}
          />
        );
      case 'statistics':
        return (
          <StatisticsLesson 
            onComplete={handleLessonComplete}
            onTeaTime={handleTeaTime}
          />
        );
      case 'number-theory':
        return (
          <NumberTheoryLesson 
            onComplete={handleLessonComplete}
            onTeaTime={handleTeaTime}
          />
        );
      case 'discrete-math':
        return (
          <DiscreteMathLesson 
            onComplete={handleLessonComplete}
            onTeaTime={handleTeaTime}
          />
        );
      case 'trigonometry':
        return (
          <TrigonometryLesson 
            onComplete={handleLessonComplete}
            onTeaTime={handleTeaTime}
          />
        );
      case 'tea-time':
        return (
          <TeaTimeBreak 
            onContinue={handleContinueFromTeaTime}
            duration={30}
          />
        );
      case 'achievements':
        return (
          <AchievementSystem 
            score={totalScore}
            lessonsCompleted={lessonsCompleted}
            perfectScores={perfectScores}
          />
        );
          default:
            return (
              <>
                <div className="academy-features">
                  <motion.div
                    className="feature-card"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    onClick={() => setCurrentView('arithmetic')}
                  >
                    <Calculator size={32} />
                    <h3>Arithmetic Lessons</h3>
                    <p>Learn basic math with Professor Tinkles</p>
                  </motion.div>

                  <motion.div
                    className="feature-card"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    onClick={() => setCurrentView('geometry')}
                  >
                    <Triangle size={32} />
                    <h3>Geometry Lessons</h3>
                    <p>Explore shapes with Sir Whiskersworth</p>
                  </motion.div>

                  <motion.div
                    className="feature-card"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    onClick={() => setCurrentView('calculus')}
                  >
                    <Zap size={32} />
                    <h3>Calculus Lessons</h3>
                    <p>Master derivatives and integrals with Professor Tinkles</p>
                  </motion.div>

                  <motion.div
                    className="feature-card"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    onClick={() => setCurrentView('set-theory')}
                  >
                    <Layers size={32} />
                    <h3>Set Theory Lessons</h3>
                    <p>Explore unions, intersections, and complements with Lady Pawsington</p>
                  </motion.div>

                  <motion.div
                    className="feature-card"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    onClick={() => setCurrentView('statistics')}
                  >
                    <BarChart3 size={32} />
                    <h3>Statistics & Probability</h3>
                    <p>Master data analysis and chance with Lady Pawsington</p>
                  </motion.div>

                  <motion.div
                    className="feature-card"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    onClick={() => setCurrentView('number-theory')}
                  >
                    <Hash size={32} />
                    <h3>Number Theory</h3>
                    <p>Explore primes, factors, and sequences with Professor Tinkles</p>
                  </motion.div>

                  <motion.div
                    className="feature-card"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    onClick={() => setCurrentView('discrete-math')}
                  >
                    <Network size={32} />
                    <h3>Discrete Mathematics</h3>
                    <p>Solve combinatorial problems with Inspector Clawson</p>
                  </motion.div>

                  <motion.div
                    className="feature-card"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    onClick={() => setCurrentView('trigonometry')}
                  >
                    <Circle size={32} />
                    <h3>Trigonometry</h3>
                    <p>Master angles and periodic functions with Sir Whiskersworth</p>
                  </motion.div>

                  <motion.div
                    className="feature-card"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                    onClick={() => setCurrentView('tea-time')}
                  >
                    <Coffee size={32} />
                    <h3>Tea Time Break</h3>
                    <p>Take a delightful British break</p>
                  </motion.div>

                  <motion.div
                    className="feature-card"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    onClick={() => setCurrentView('achievements')}
                  >
                    <Trophy size={32} />
                    <h3>Achievements</h3>
                    <p>View your mathematical progress</p>
                  </motion.div>
                </div>

                <div className="characters-section">
                  <h2 className="section-title">Meet Your Instructors</h2>
                  <div className="characters-grid">
                    {characters.map(({ id, component: CharacterComponent, name }) => (
                      <CharacterComponent
                        key={id}
                        isActive={activeCharacter === id}
                        onSpeak={handleCharacterSpeak}
                      />
                    ))}
                  </div>
                </div>
              </>
            );
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <motion.div
          className="academy-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Professor Tinkles' Math Academy</h1>
          <p className="academy-subtitle">
            A place where numbers dance and equations purr
          </p>
        </motion.div>
        
        {currentView !== 'home' && (
          <motion.button
            className="home-button"
            onClick={() => setCurrentView('home')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Home size={20} />
            Back to Academy
          </motion.button>
        )}
      </header>

      <main className="app-main">
        {renderCurrentView()}
      </main>

      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="character-message"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <MessageCircle size={24} />
            <p>{currentMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="app-footer">
        <p>
          *A tribute project honoring a beloved mother who loved cats, taught math, 
          and had a wonderful sense of British humour.*
        </p>
      </footer>
    </div>
  );
};

export default App;
