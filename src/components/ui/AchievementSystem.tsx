import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Crown, Medal, Award, Sparkles } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
  unlockedAt?: Date;
}

interface AchievementSystemProps {
  score: number;
  lessonsCompleted: number;
  perfectScores: number;
}

const AchievementSystem: React.FC<AchievementSystemProps> = ({ 
  score, 
  lessonsCompleted, 
  perfectScores 
}) => {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first-lesson',
      title: 'First Steps',
      description: 'Complete your first math lesson',
      icon: <Star size={32} />,
      rarity: 'common',
      unlocked: false
    },
    {
      id: 'perfect-score',
      title: 'Purr-fect Score',
      description: 'Get a perfect score on any lesson',
      icon: <Crown size={32} />,
      rarity: 'rare',
      unlocked: false
    },
    {
      id: 'math-master',
      title: 'Mathematical Master',
      description: 'Complete 5 lessons',
      icon: <Trophy size={32} />,
      rarity: 'epic',
      unlocked: false
    },
    {
      id: 'geometry-genius',
      title: 'Geometry Genius',
      description: 'Master all geometry concepts',
      icon: <Medal size={32} />,
      rarity: 'rare',
      unlocked: false
    },
    {
      id: 'tea-lover',
      title: 'Tea Time Enthusiast',
      description: 'Take 10 tea time breaks',
      icon: <Award size={32} />,
      rarity: 'common',
      unlocked: false
    },
    {
      id: 'perfectionist',
      title: 'Perfectionist',
      description: 'Get 3 perfect scores in a row',
      icon: <Crown size={32} />,
      rarity: 'legendary',
      unlocked: false
    }
  ]);

  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const updatedAchievements = [...achievements];
    let hasNewAchievement = false;

    // Check for new achievements
    if (lessonsCompleted >= 1 && !updatedAchievements[0].unlocked) {
      updatedAchievements[0].unlocked = true;
      updatedAchievements[0].unlockedAt = new Date();
      setNewAchievements(prev => [...prev, updatedAchievements[0]]);
      hasNewAchievement = true;
    }

    if (perfectScores >= 1 && !updatedAchievements[1].unlocked) {
      updatedAchievements[1].unlocked = true;
      updatedAchievements[1].unlockedAt = new Date();
      setNewAchievements(prev => [...prev, updatedAchievements[1]]);
      hasNewAchievement = true;
    }

    if (lessonsCompleted >= 5 && !updatedAchievements[2].unlocked) {
      updatedAchievements[2].unlocked = true;
      updatedAchievements[2].unlockedAt = new Date();
      setNewAchievements(prev => [...prev, updatedAchievements[2]]);
      hasNewAchievement = true;
    }

    if (perfectScores >= 3 && !updatedAchievements[5].unlocked) {
      updatedAchievements[5].unlocked = true;
      updatedAchievements[5].unlockedAt = new Date();
      setNewAchievements(prev => [...prev, updatedAchievements[5]]);
      hasNewAchievement = true;
    }

    if (hasNewAchievement) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    }

    setAchievements(updatedAchievements);
  }, [lessonsCompleted, perfectScores, achievements]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return '#95a5a6';
      case 'rare': return '#3498db';
      case 'epic': return '#9b59b6';
      case 'legendary': return '#f39c12';
      default: return '#95a5a6';
    }
  };

  const getRarityText = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'Common';
      case 'rare': return 'Rare';
      case 'epic': return 'Epic';
      case 'legendary': return 'Legendary';
      default: return 'Common';
    }
  };

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  return (
    <div className="achievement-system">
      <div className="achievement-header">
        <h2>🏆 Achievements</h2>
        <div className="achievement-stats">
          <span className="stat">
            <Trophy size={20} />
            {unlockedAchievements.length} / {achievements.length}
          </span>
        </div>
      </div>

      <div className="achievements-grid">
        {unlockedAchievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            className={`achievement-card unlocked`}
            style={{ borderColor: getRarityColor(achievement.rarity) }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="achievement-icon" style={{ color: getRarityColor(achievement.rarity) }}>
              {achievement.icon}
            </div>
            <div className="achievement-content">
              <h3>{achievement.title}</h3>
              <p>{achievement.description}</p>
              <div className="achievement-rarity" style={{ color: getRarityColor(achievement.rarity) }}>
                {getRarityText(achievement.rarity)}
              </div>
              {achievement.unlockedAt && (
                <div className="achievement-date">
                  Unlocked: {achievement.unlockedAt.toLocaleDateString()}
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {lockedAchievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            className="achievement-card locked"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: (unlockedAchievements.length + index) * 0.1 }}
          >
            <div className="achievement-icon locked">
              {achievement.icon}
            </div>
            <div className="achievement-content">
              <h3>???</h3>
              <p>Complete more lessons to unlock this achievement!</p>
              <div className="achievement-rarity locked">
                Locked
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showNotification && newAchievements.length > 0 && (
          <motion.div
            className="achievement-notification"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <div className="notification-content">
              <Sparkles size={24} className="sparkle-icon" />
              <h3>New Achievement Unlocked!</h3>
              {newAchievements.map((achievement, index) => (
                <div key={achievement.id} className="notification-achievement">
                  <div className="notification-icon" style={{ color: getRarityColor(achievement.rarity) }}>
                    {achievement.icon}
                  </div>
                  <div>
                    <h4>{achievement.title}</h4>
                    <p>{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AchievementSystem;
