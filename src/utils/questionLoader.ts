export interface Question {
  id: string;
  question: string;
  answer: number;
  options: number[];
  explanation: string;
  concept: string;
}

export interface LessonData {
  lessonInfo: {
    title: string;
    instructor: string;
    emoji: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    concepts: string[];
  };
  questions: Question[];
}

export interface LoadedLesson {
  title: string;
  instructor: string;
  emoji: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  problems: Question[];
  concepts: string[];
}

/**
 * Loads lesson data from JSON file and randomizes questions
 * @param lessonName - The name of the lesson (e.g., 'number-recognition', 'counting')
 * @param questionCount - Number of questions to select (default: 5)
 * @returns Promise<LoadedLesson>
 */
export async function loadLessonQuestions(
  lessonName: string, 
  questionCount: number = 5
): Promise<LoadedLesson> {
  try {
    console.log(`🔄 Loading lesson: ${lessonName} (${questionCount} questions)`);
    const response = await fetch(`/data/${lessonName}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load lesson data: ${response.statusText}`);
    }
    
    const data: LessonData = await response.json();
    console.log(`📊 Loaded ${data.questions.length} questions from ${lessonName}.json`);
    
    // Randomize and select questions
    const shuffledQuestions = [...data.questions].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffledQuestions.slice(0, questionCount);
    
    console.log(`🎯 Selected questions:`, selectedQuestions.map(q => q.id));
    
    return {
      title: data.lessonInfo.title,
      instructor: data.lessonInfo.instructor,
      emoji: data.lessonInfo.emoji,
      difficulty: data.lessonInfo.difficulty,
      problems: selectedQuestions,
      concepts: data.lessonInfo.concepts
    };
  } catch (error) {
    console.error(`Error loading lesson ${lessonName}:`, error);
    throw error;
  }
}

/**
 * Shuffles an array using Fisher-Yates algorithm
 * @param array - Array to shuffle
 * @returns Shuffled array
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
