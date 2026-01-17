export type Language = {
  id: string;
  name: string;
  flag: string;
};

export type Word = {
  id: string;
  word: string;
  translation: string;
  pronunciation: string; // The text to be pronounced
  exampleSentence: string;
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  words: Word[];
  progress: number; // 0-100
};

export type QuizQuestion = {
  id: string;
  wordId: string;
  question: string;
  options: string[];
  correctAnswer: string;
};

export type Quiz = {
  id: string;
  lessonId: string;
  title: string;
  questions: QuizQuestion[];
};

export type UserProgress = {
  language: string;
  completedLessons: string[];
  quizScores: { [quizId: string]: number };
  dailyGoal: number;
  weeklyActivity: { day: string, score: number }[];
};
