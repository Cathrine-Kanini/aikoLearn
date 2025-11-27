import React, { useState } from 'react';
import { Lightbulb, AlertCircle } from 'lucide-react';
// import { api } from '../../config/api';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Textarea from '../../components/common/Textarea';
import Select from '../../components/common/Select';
import Alert from '../../components/common/Alert';
import Loading from '../../components/common/Loading';
import { GRADES, SUBJECTS, HINT_LEVELS } from '../../utils/constants';

const Homework = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    question: '',
    grade: '',
    subject: '',
    hint_level: 'medium'
  });
  const [hint, setHint] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.question || !formData.grade || !formData.subject) {
      setError('Please fill in all required fields');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      const response = await api.getHomeworkHelp(formData);
      setHint(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to get homework help');
    } finally {
      setLoading(false);
    }
  };
  
  const handleReset = () => {
    setFormData({
      question: '',
      grade: '',
      subject: '',
      hint_level: 'medium'
    });
    setHint(null);
    setError('');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Homework Help</h1>
          <p className="text-gray-600">Get hints to solve problems yourself</p>
        </div>
        
        {/* Important Notice */}
        <Alert 
          type="info" 
          title="Important!"
          message="This tool provides hints to help you learn, not direct answers. Try solving the problem first!"
          className="mb-6"
        />
        
        {error && (
          <Alert type="error" message={error} onClose={() => setError('')} className="mb-4" />
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <Card>
            <h2 className="text-xl font-semibold mb-6">Your Question</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                label="Homework Question"
                value={formData.question}
                onChange={(e) => setFormData({...formData, question: e.target.value})}
                placeholder="Type your homework question here..."
                rows={6}
                required
                maxLength={500}
                showCount
              />
              
              <Select
                label="Grade"
                value={formData.grade}
                onChange={(e) => setFormData({...formData, grade: e.target.value})}
                options={GRADES}
                placeholder="Select grade"
                required
              />
              
              <Select
                label="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                options={SUBJECTS}
                placeholder="Select subject"
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hint Level
                </label>
                <div className="space-y-2">
                  {HINT_LEVELS.map((level) => (
                    <label
                      key={level.value}
                      className={`flex items-start p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                        formData.hint_level === level.value
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="hint_level"
                        value={level.value}
                        checked={formData.hint_level === level.value}
                        onChange={(e) => setFormData({...formData, hint_level: e.target.value})}
                        className="mt-1"
                      />
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{level.label}</p>
                        <p className="text-sm text-gray-600">{level.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button
                  type="submit"
                  loading={loading}
                  disabled={loading}
                  fullWidth
                >
                  Get Hint
                </Button>
                {hint && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                )}
              </div>
            </form>
          </Card>
          
          {/* Hint Display */}
          <div>
            {loading ? (
              <Card>
                <Loading text="Getting your hint..." />
              </Card>
            ) : hint ? (
              <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                <div className="flex items-start space-x-3 mb-4">
                  <Lightbulb className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Your Hint</h3>
                    <p className="text-sm text-gray-600">Hint Level: {hint.hint_level}</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 mb-4">
                  <p className="text-gray-800 whitespace-pre-wrap">{hint.hint}</p>
                </div>
                
                <Alert
                  type="warning"
                  message={hint.reminder}
                />
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center text-center">
                <div>
                  <Lightbulb className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Your hint will appear here</p>
                  <p className="text-sm text-gray-400 mt-2">Fill in the form and click "Get Hint"</p>
                </div>
              </Card>
            )}
            
            {/* Tips */}
            <Card className="mt-6 bg-blue-50 border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-blue-600" />
                Study Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Try solving the problem yourself first</li>
                <li>• Start with a light hint and work your way up</li>
                <li>• Make notes of what you learn</li>
                <li>• Verify your answer with your teacher</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homework;