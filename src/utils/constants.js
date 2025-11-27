export const GRADES = [
  { value: '4', label: 'Grade 4' },
  { value: '5', label: 'Grade 5' },
  { value: '6', label: 'Grade 6' },
  { value: '7', label: 'Grade 7' },
  { value: '8', label: 'Grade 8' },
];

export const SUBJECTS = [
  { 
    value: 'math', 
    label: 'Mathematics',
    icon: '🔢',
    color: 'bg-blue-500'
  },
  { 
    value: 'science', 
    label: 'Science',
    icon: '🔬',
    color: 'bg-green-500'
  },
  { 
    value: 'english', 
    label: 'English',
    icon: '📚',
    color: 'bg-purple-500'
  },
  { 
    value: 'kiswahili', 
    label: 'Kiswahili',
    icon: '🗣️',
    color: 'bg-orange-500'
  },
];

export const LANGUAGES = [
  { value: 'en', label: 'English', flag: '🇬🇧' },
  { value: 'sw', label: 'Kiswahili', flag: '🇰🇪' },
];

export const DIFFICULTY_LEVELS = [
  { value: 'easy', label: 'Easy', icon: '😊' },
  { value: 'medium', label: 'Medium', icon: '🤔' },
  { value: 'hard', label: 'Hard', icon: '😰' },
];

export const HINT_LEVELS = [
  { value: 'light', label: 'Light Hint', description: 'Just a small nudge' },
  { value: 'medium', label: 'Medium Hint', description: 'Guide through thinking' },
  { value: 'detailed', label: 'Detailed Hint', description: 'Explain concept with example' },
];

export const READING_LEVELS = [
  { value: 'easy', label: 'Easy', description: 'Very simple words' },
  { value: 'medium', label: 'Medium', description: 'Clear language' },
  { value: 'advanced', label: 'Advanced', description: 'Standard grade-level' },
];

export const ASSESSMENT_TYPES = [
  { value: 'mcq', label: 'Multiple Choice', icon: '☑️' },
  { value: 'short_answer', label: 'Short Answer', icon: '✍️' },
  { value: 'essay', label: 'Essay', icon: '📝' },
  { value: 'mixed', label: 'Mixed', icon: '🎯' },
];

export const TERMS = [
  { value: 1, label: 'Term 1' },
  { value: 2, label: 'Term 2' },
  { value: 3, label: 'Term 3' },
];

export const MASTERY_LEVELS = [
  { value: 'beginner', label: 'Beginner', color: 'text-yellow-600' },
  { value: 'intermediate', label: 'Intermediate', color: 'text-blue-600' },
  { value: 'advanced', label: 'Advanced', color: 'text-green-600' },
];

export const USER_TYPES = [
  { 
    value: 'student', 
    label: 'Student',
    icon: '🎓',
    description: 'Learn and practice'
  },
  { 
    value: 'teacher', 
    label: 'Teacher',
    icon: '👨‍🏫',
    description: 'Create lesson plans and assessments'
  },
];

export const STUDENT_FEATURES = [
  {
    id: 'chat',
    title: 'Ask Questions',
    description: 'Get instant help with any topic',
    icon: '💬',
    path: '/student/chat',
    color: 'bg-blue-500'
  },
  {
    id: 'quiz',
    title: 'Practice Quiz',
    description: 'Test your knowledge',
    icon: '📝',
    path: '/student/quiz',
    color: 'bg-green-500'
  },
  {
    id: 'homework',
    title: 'Homework Help',
    description: 'Get hints without direct answers',
    icon: '📚',
    path: '/student/homework',
    color: 'bg-purple-500'
  },
  {
    id: 'solve',
    title: 'Step-by-Step',
    description: 'Solve problems with explanations',
    icon: '🔍',
    path: '/student/solve',
    color: 'bg-orange-500'
  },
  {
    id: 'explore',
    title: 'Explore Topics',
    description: 'Learn about any concept',
    icon: '🌟',
    path: '/student/explore',
    color: 'bg-pink-500'
  },
  {
    id: 'daily-tip',
    title: 'Daily Tip',
    description: 'Learn something new every day',
    icon: '💡',
    path: '/student/daily-tip',
    color: 'bg-yellow-500'
  },
];

export const TEACHER_FEATURES = [
  {
    id: 'lesson-plan',
    title: 'Lesson Plans',
    description: 'Generate CBC-aligned lesson plans',
    icon: '📋',
    path: '/teacher/lesson-plan',
    color: 'bg-blue-500'
  },
  {
    id: 'assessment',
    title: 'Assessments',
    description: 'Create tests with marking schemes',
    icon: '📊',
    path: '/teacher/assessment',
    color: 'bg-green-500'
  },
  {
    id: 'scheme',
    title: 'Scheme of Work',
    description: 'Generate term schemes',
    icon: '📅',
    path: '/teacher/scheme',
    color: 'bg-purple-500'
  },
  {
    id: 'progress',
    title: 'Progress Reports',
    description: 'Generate student reports',
    icon: '📈',
    path: '/teacher/progress',
    color: 'bg-orange-500'
  },
];