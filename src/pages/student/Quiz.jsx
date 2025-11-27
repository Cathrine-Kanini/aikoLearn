import React, { useState } from 'react';
import { CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react';
import { api } from '../../config/api';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Alert from '../../components/common/Alert';
import Loading from '../../components/common/Loading';
import { GRADES, SUBJECTS, DIFFICULTY_LEVELS } from '../../utils/constants';

const Quiz = () => {
  const [step, setStep] = useState('config'); // config, quiz, results
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [config, setConfig] = useState({
    topic: '',
    grade: '',
    subject: '',
    num_questions: 5,
    difficulty: 'medium'
  });
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  
  const handleGenerate = async () => {
    if (!config.topic || !config.grade || !config.subject) {
      setError('Please fill in all required fields');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      const response = await api.generateQuiz(config);
      setQuiz(response.data.quiz);
      setStep('quiz');
      setCurrentQuestion(0);
      setSelectedAnswers({});
      setShowResults(false);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to generate quiz');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSelectAnswer = (questionId, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer
    });
  };
  
  const handleSubmit = () => {
    setShowResults(true);
    setStep('results');
  };
  
  const calculateScore = () => {
    if (!quiz || !quiz.questions) return 0;
    
    let correct = 0;
    quiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct_answer) {
        correct++;
      }
    });
    
    return Math.round((correct / quiz.questions.length) * 100);
  };
  
  const handleReset = () => {
    setStep('config');
    setQuiz(null);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setConfig({
      topic: '',
      grade: '',
      subject: '',
      num_questions: 5,
      difficulty: 'medium'
    });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loading text="Generating your quiz..." />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Practice Quiz</h1>
          <p className="text-gray-600">Test your knowledge with AI-generated questions</p>
        </div>
        
        {error && (
          <Alert type="error" message={error} onClose={() => setError('')} className="mb-4" />
        )}
        
        {/* Configuration Step */}
        {step === 'config' && (
          <Card>
            <h2 className="text-xl font-semibold mb-6">Quiz Configuration</h2>
            
            <div className="space-y-4">
              <Input
                label="Topic"
                value={config.topic}
                onChange={(e) => setConfig({...config, topic: e.target.value})}
                placeholder="e.g., Fractions, Photosynthesis, Verbs..."
                required
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Grade"
                  value={config.grade}
                  onChange={(e) => setConfig({...config, grade: e.target.value})}
                  options={GRADES}
                  placeholder="Select grade"
                  required
                />
                
                <Select
                  label="Subject"
                  value={config.subject}
                  onChange={(e) => setConfig({...config, subject: e.target.value})}
                  options={SUBJECTS}
                  placeholder="Select subject"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Number of Questions"
                  type="number"
                  min="3"
                  max="10"
                  value={config.num_questions}
                  onChange={(e) => setConfig({...config, num_questions: parseInt(e.target.value)})}
                />
                
                <Select
                  label="Difficulty"
                  value={config.difficulty}
                  onChange={(e) => setConfig({...config, difficulty: e.target.value})}
                  options={DIFFICULTY_LEVELS}
                />
              </div>
              
              <Button
                onClick={handleGenerate}
                fullWidth
                size="lg"
                className="mt-6"
              >
                Generate Quiz
              </Button>
            </div>
          </Card>
        )}
        
        {/* Quiz Step */}
        {step === 'quiz' && quiz && (
          <>
            {/* Progress */}
            <Card className="mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Question {currentQuestion + 1} of {quiz.questions.length}
                </span>
                <span className="text-sm text-gray-600">
                  {Object.keys(selectedAnswers).length} answered
                </span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%`}}
                />
              </div>
            </Card>
            
            {/* Question */}
            <Card>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {quiz.questions[currentQuestion].question}
                </h3>
                
                <div className="space-y-3">
                  {quiz.questions[currentQuestion].options.map((option, idx) => {
                    const optionLetter = option.charAt(0);
                    const isSelected = selectedAnswers[quiz.questions[currentQuestion].id] === optionLetter;
                    
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectAnswer(quiz.questions[currentQuestion].id, optionLetter)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                          isSelected
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-300 bg-white'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {/* Navigation */}
              <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                <Button
                  variant="secondary"
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                
                {currentQuestion === quiz.questions.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={Object.keys(selectedAnswers).length !== quiz.questions.length}
                  >
                    Submit Quiz
                  </Button>
                ) : (
                  <Button
                    onClick={() => setCurrentQuestion(Math.min(quiz.questions.length - 1, currentQuestion + 1))}
                  >
                    Next
                  </Button>
                )}
              </div>
            </Card>
          </>
        )}
        
        {/* Results Step */}
        {step === 'results' && quiz && (
          <>
            {/* Score Card */}
            <Card className="mb-6 text-center bg-gradient-to-r from-primary-50 to-purple-50">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {calculateScore()}%
              </h2>
              <p className="text-gray-600">
                You got {quiz.questions.filter(q => selectedAnswers[q.id] === q.correct_answer).length} out of {quiz.questions.length} correct!
              </p>
            </Card>
            
            {/* Detailed Results */}
            <div className="space-y-4">
              {quiz.questions.map((question, idx) => {
                const userAnswer = selectedAnswers[question.id];
                const isCorrect = userAnswer === question.correct_answer;
                
                return (
                  <Card key={question.id}>
                    <div className="flex items-start space-x-3">
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                      )}
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Question {idx + 1}: {question.question}
                        </h3>
                        
                        <div className="space-y-2 text-sm">
                          <p>
                            <span className="text-gray-600">Your answer: </span>
                            <span className={isCorrect ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                              {userAnswer}
                            </span>
                          </p>
                          
                          {!isCorrect && (
                            <p>
                              <span className="text-gray-600">Correct answer: </span>
                              <span className="text-green-600 font-medium">
                                {question.correct_answer}
                              </span>
                            </p>
                          )}
                          
                          {question.explanation && (
                            <p className="text-gray-700 mt-2 p-3 bg-blue-50 rounded-lg">
                              <span className="font-medium">Explanation: </span>
                              {question.explanation}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
            
            <div className="mt-6 flex gap-4">
              <Button
                onClick={handleReset}
                variant="outline"
                fullWidth
                icon={<RotateCcw className="w-4 h-4" />}
              >
                Take Another Quiz
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;