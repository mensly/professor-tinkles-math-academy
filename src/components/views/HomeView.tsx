import React from 'react';
import { motion } from 'framer-motion';
import ProfessorTinkles from '../characters/ProfessorTinkles';
import SirWhiskersworth from '../characters/SirWhiskersworth';
import LadyPawsington from '../characters/LadyPawsington';
import InspectorClawson from '../characters/InspectorClawson';
import { Calculator, Triangle, Zap, Layers, BarChart3, Hash, Network, Circle, Coffee, Trophy } from 'lucide-react';

type ViewType = 'home' | 'arithmetic' | 'geometry' | 'calculus' | 'set-theory' | 'statistics' | 'number-theory' | 'discrete-math' | 'trigonometry' | 'tea-time' | 'achievements';

interface HomeViewProps {
  onViewChange: (view: ViewType) => void;
  onCharacterSpeak: (message: string) => void;
  activeCharacter: string | null;
}

const HomeView: React.FC<HomeViewProps> = ({ onViewChange, onCharacterSpeak, activeCharacter }) => {
  const characters = [
    { id: 'professor', component: ProfessorTinkles, name: 'Professor Tinkles' },
    { id: 'sir-whiskersworth', component: SirWhiskersworth, name: 'Sir Whiskersworth' },
    { id: 'lady-pawsington', component: LadyPawsington, name: 'Lady Pawsington' },
    { id: 'inspector', component: InspectorClawson, name: 'Inspector Clawson' }
  ];

  const featureCards: Array<{
    icon: React.ComponentType<{ size: number }>;
    title: string;
    description: string;
    view: ViewType;
    delay: number;
  }> = [
    {
      icon: Calculator,
      title: 'Arithmetic Lessons',
      description: 'Learn basic math with Professor Tinkles',
      view: 'arithmetic',
      delay: 0.2
    },
    {
      icon: Triangle,
      title: 'Geometry Lessons',
      description: 'Explore shapes with Sir Whiskersworth',
      view: 'geometry',
      delay: 0.3
    },
    {
      icon: Zap,
      title: 'Calculus Lessons',
      description: 'Master derivatives and integrals with Professor Tinkles',
      view: 'calculus',
      delay: 0.4
    },
    {
      icon: Layers,
      title: 'Set Theory Lessons',
      description: 'Explore unions, intersections, and complements with Lady Pawsington',
      view: 'set-theory',
      delay: 0.5
    },
    {
      icon: BarChart3,
      title: 'Statistics & Probability',
      description: 'Master data analysis and chance with Lady Pawsington',
      view: 'statistics',
      delay: 0.6
    },
    {
      icon: Hash,
      title: 'Number Theory',
      description: 'Explore primes, factors, and sequences with Professor Tinkles',
      view: 'number-theory',
      delay: 0.7
    },
    {
      icon: Network,
      title: 'Discrete Mathematics',
      description: 'Solve combinatorial problems with Inspector Clawson',
      view: 'discrete-math',
      delay: 0.8
    },
    {
      icon: Circle,
      title: 'Trigonometry',
      description: 'Master angles and periodic functions with Sir Whiskersworth',
      view: 'trigonometry',
      delay: 0.9
    },
    {
      icon: Coffee,
      title: 'Tea Time Break',
      description: 'Take a delightful British break',
      view: 'tea-time',
      delay: 1.0
    },
    {
      icon: Trophy,
      title: 'Achievements',
      description: 'View your mathematical progress',
      view: 'achievements',
      delay: 1.1
    }
  ];

  return (
    <>
      <div className="academy-features">
        {featureCards.map(({ icon: Icon, title, description, view, delay }) => (
          <motion.div
            key={view}
            className="feature-card"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            onClick={() => onViewChange(view)}
          >
            <Icon size={32} />
            <h3>{title}</h3>
            <p>{description}</p>
          </motion.div>
        ))}
      </div>

      <div className="characters-section">
        <h2 className="section-title">Meet Your Instructors</h2>
        <div className="characters-grid">
          {characters.map(({ id, component: CharacterComponent, name }) => (
            <CharacterComponent
              key={id}
              isActive={activeCharacter === id}
              onSpeak={onCharacterSpeak}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeView;
