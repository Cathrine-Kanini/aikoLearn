import axios from 'axios';

// API Base URL - Update this to your backend URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://aiko-f4yf.onrender.com';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.request);
    } else {
      // Error in request setup
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const api = {
  // Health check
  healthCheck: () => apiClient.get('/health'),
  
  // Get subjects
  getSubjects: () => apiClient.get('/api/subjects'),
  
  // Student endpoints
  chat: (data) => apiClient.post('/api/chat', data),
  generateQuiz: (data) => apiClient.post('/api/quiz/generate', data),
  getHomeworkHelp: (data) => apiClient.post('/api/homework-help', data),
  getDailyTip: (grade, subject) => apiClient.get(`/api/daily-tip?grade=${grade}&subject=${subject}`),
  solveProblem: (data) => apiClient.post('/api/solve-problem', data),
  getSimilarQuestions: (data) => apiClient.post('/api/similar-questions', data),
  exploreTopic: (topic, grade, subject) => apiClient.get(`/api/explore-topic/${topic}?grade=${grade}&subject=${subject}`),
  getLearningPath: (data) => apiClient.post('/api/learning-path', data),
  
  // Teacher endpoints
  generateLessonPlan: (data) => apiClient.post('/api/teacher/lesson-plan', data),
  generateAssessment: (data) => apiClient.post('/api/teacher/assessment', data),
  generateSchemeOfWork: (data) => apiClient.post('/api/teacher/scheme-of-work', data),
  generateProgressReport: (data) => apiClient.post('/api/teacher/progress-report', data),
  
  // Accessibility endpoints
  simplifyText: (data) => apiClient.post('/api/simplify', data),
  visualizeConcept: (data) => apiClient.post('/api/visualize-concept', data),
};

export default apiClient;