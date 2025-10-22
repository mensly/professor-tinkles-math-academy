import React, { useState } from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import HomeView from './views/HomeView';
import LessonRouter from './routing/LessonRouter';
import CharacterMessage from './ui/CharacterMessage';

const App: React.FC = () => {
  const [activeCharacter] = useState<string | null>(null);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [showMessage, setShowMessage] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'number-recognition' | 'counting' | 'arithmetic' | 'fractions-decimals' | 'algebra-basics' | 'probability' | 'geometry' | 'trigonometry' | 'statistics' | 'applied-math' | 'calculus' | 'set-theory' | 'number-theory' | 'discrete-math' | 'math-nature' | 'tea-time' | 'achievements'>('home');
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

  const renderCurrentView = () => {
    if (currentView === 'home') {
      return (
        <HomeView
          onViewChange={setCurrentView}
          onCharacterSpeak={handleCharacterSpeak}
          activeCharacter={activeCharacter}
        />
      );
    }

    return (
      <LessonRouter
        currentView={currentView}
        onLessonComplete={handleLessonComplete}
        onTeaTime={handleTeaTime}
        onContinueFromTeaTime={handleContinueFromTeaTime}
        totalScore={totalScore}
        lessonsCompleted={lessonsCompleted}
        perfectScores={perfectScores}
      />
    );
  };

  return (
    <div className="app">
      <Header 
        currentView={currentView}
        onHomeClick={() => setCurrentView('home')}
      />

      <main className="app-main">
        {renderCurrentView()}
      </main>

      <CharacterMessage 
        show={showMessage}
        message={currentMessage}
      />

      <Footer />
    </div>
  );
};

export default App;
