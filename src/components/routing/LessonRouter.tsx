import React from 'react';
import ArithmeticLesson from '../lessons/ArithmeticLesson';
import CountingLesson from '../lessons/CountingLesson';
import NumberRecognitionLesson from '../lessons/NumberRecognitionLesson';
import GeometryLesson from '../lessons/GeometryLesson';
import CalculusLesson from '../lessons/CalculusLesson';
import SetTheoryLesson from '../lessons/SetTheoryLesson';
import StatisticsLesson from '../lessons/StatisticsLesson';
import NumberTheoryLesson from '../lessons/NumberTheoryLesson';
import DiscreteMathLesson from '../lessons/DiscreteMathLesson';
import TrigonometryLesson from '../lessons/TrigonometryLesson';
import TeaTimeBreak from '../ui/TeaTimeBreak';
import AchievementSystem from '../ui/AchievementSystem';

interface LessonRouterProps {
  currentView: string;
  onLessonComplete: (score: number) => void;
  onTeaTime: () => void;
  onContinueFromTeaTime: () => void;
  totalScore: number;
  lessonsCompleted: number;
  perfectScores: number;
}

const LessonRouter: React.FC<LessonRouterProps> = ({
  currentView,
  onLessonComplete,
  onTeaTime,
  onContinueFromTeaTime,
  totalScore,
  lessonsCompleted,
  perfectScores
}) => {
  switch (currentView) {
    case 'number-recognition':
      return (
        <NumberRecognitionLesson 
          onComplete={onLessonComplete}
          onTeaTime={onTeaTime}
        />
      );
    case 'counting':
      return (
        <CountingLesson 
          onComplete={onLessonComplete}
          onTeaTime={onTeaTime}
        />
      );
    case 'arithmetic':
      return (
        <ArithmeticLesson 
          onComplete={onLessonComplete}
          onTeaTime={onTeaTime}
        />
      );
    case 'geometry':
      return (
        <GeometryLesson 
          onComplete={onLessonComplete}
          onTeaTime={onTeaTime}
        />
      );
    case 'calculus':
      return (
        <CalculusLesson 
          onComplete={onLessonComplete}
          onTeaTime={onTeaTime}
        />
      );
    case 'set-theory':
      return (
        <SetTheoryLesson 
          onComplete={onLessonComplete}
          onTeaTime={onTeaTime}
        />
      );
    case 'statistics':
      return (
        <StatisticsLesson 
          onComplete={onLessonComplete}
          onTeaTime={onTeaTime}
        />
      );
    case 'number-theory':
      return (
        <NumberTheoryLesson 
          onComplete={onLessonComplete}
          onTeaTime={onTeaTime}
        />
      );
    case 'discrete-math':
      return (
        <DiscreteMathLesson 
          onComplete={onLessonComplete}
          onTeaTime={onTeaTime}
        />
      );
    case 'trigonometry':
      return (
        <TrigonometryLesson 
          onComplete={onLessonComplete}
          onTeaTime={onTeaTime}
        />
      );
    case 'tea-time':
      return (
        <TeaTimeBreak 
          onContinue={onContinueFromTeaTime}
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
      return null;
  }
};

export default LessonRouter;
