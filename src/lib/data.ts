import type { Language, Lesson, Quiz, UserProgress } from './types';

export const LANGUAGES: Language[] = [
  { id: 'es', name: 'Spanish', flag: '🇪🇸' },
  { id: 'fr', name: 'French', flag: '🇫🇷' },
  { id: 'de', name: 'German', flag: '🇩🇪' },
  { id: 'jp', name: 'Japanese', flag: '🇯🇵' },
];

export const LESSONS: Lesson[] = [
  {
    id: '1',
    title: 'Common Greetings',
    description: 'Learn how to greet people and introduce yourself.',
    progress: 100,
    words: [
      {
        id: 'w1',
        word: 'Hola',
        translation: 'Hello',
        pronunciation: 'Hola',
        exampleSentence: 'Hola, ¿cómo estás?',
      },
      {
        id: 'w2',
        word: 'Adiós',
        translation: 'Goodbye',
        pronunciation: 'Adiós',
        exampleSentence: 'Adiós, hasta luego.',
      },
      {
        id: 'w3',
        word: 'Gracias',
        translation: 'Thank you',
        pronunciation: 'Gracias',
        exampleSentence: 'Muchas gracias por tu ayuda.',
      },
      {
        id: 'w4',
        word: 'Por favor',
        translation: 'Please',
        pronunciation: 'Por favor',
        exampleSentence: 'Pásame la sal, por favor.',
      },
    ],
  },
  {
    id: '2',
    title: 'At the Restaurant',
    description: 'Essential vocabulary for ordering food and drinks.',
    progress: 50,
    words: [
      {
        id: 'w5',
        word: 'Menú',
        translation: 'Menu',
        pronunciation: 'Menú',
        exampleSentence: '¿Puedo ver el menú, por favor?',
      },
      {
        id: 'w6',
        word: 'Agua',
        translation: 'Water',
        pronunciation: 'Agua',
        exampleSentence: 'Quisiera un vaso de agua.',
      },
      {
        id: 'w7',
        word: 'Comida',
        translation: 'Food',
        pronunciation: 'Comida',
        exampleSentence: 'La comida está deliciosa.',
      },
      {
        id: 'w8',
        word: 'Cuenta',
        translation: 'Bill / Check',
        pronunciation: 'Cuenta',
        exampleSentence: 'La cuenta, por favor.',
      },
    ],
  },
  {
    id: '3',
    title: 'Travel and Directions',
    description: 'Navigate new places with confidence.',
    progress: 0,
    words: [], // No words yet
  },
  {
    id: '4',
    title: 'Shopping Essentials',
    description: 'Learn words for shopping and bargaining.',
    progress: 0,
    words: [], // No words yet
  },
];

export const QUIZZES: Quiz[] = [
  {
    id: 'q1',
    lessonId: '1',
    title: 'Quiz: Common Greetings',
    questions: [
      {
        id: 'qq1',
        wordId: 'w1',
        question: 'How do you say "Hello" in Spanish?',
        options: ['Adiós', 'Hola', 'Gracias', 'Sí'],
        correctAnswer: 'Hola',
      },
      {
        id: 'qq2',
        wordId: 'w3',
        question: 'What does "Gracias" mean?',
        options: ['Please', 'Goodbye', 'Thank you', 'Yes'],
        correctAnswer: 'Thank you',
      },
    ],
  },
];

export const USER_PROGRESS: UserProgress = {
  language: 'es',
  completedLessons: ['1'],
  quizScores: {
    q1: 88,
  },
  dailyGoal: 60, // 60% of daily goal completed
  weeklyActivity: [
    { day: 'Mon', score: 75 },
    { day: 'Tue', score: 80 },
    { day: 'Wed', score: 88 },
    { day: 'Thu', score: 82 },
    { day: 'Fri', score: 90 },
    { day: 'Sat', score: 0 },
    { day: 'Sun', score: 0 },
  ],
};
