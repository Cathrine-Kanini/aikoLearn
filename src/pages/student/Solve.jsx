import React, { useState } from 'react';
import { Calculator, CheckCircle } from 'lucide-react';
import { api } from '../../config/api';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Textarea from '../../components/common/TextArea.js';
import Select from '../../components/common/Select';
import Alert from '../../components/common/Alert';
import Loading from '../../components/common/Loading';
import Badge from '../../components/common/Badge';
import { GRADES, SUBJECTS } from '../../utils/constants';

const Solve = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    problem: '',
    grade: '',
    subject: ''
  });
  const [solution, setSolution] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.problem || !formData.grade || !formData.subject) {
      setError('Please fill in all required fields');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      const response = await api.solveProblem(formData);
      setSolution(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to solve problem');
    } finally {
      setLoading(false);
    }
  };
  
  const handleReset = () => {
    setFormData({
      problem: '',
      grade: '',
      subject: ''
    });
    setSolution(null);
    setError('');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Calculator className="w-8 h-8 mr-2 text-primary-600" />
            Step-by-Step Solutions
          </h1>
          <p className="text-gray-600">Get detailed explanations for any problem</p>
        </div>
        
        {error && (
          <Alert type="error" message={error} onClose={() => setError('')} className="mb-4" />
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <div>
            <Card>
              <h2 className="text-xl font-semibold mb-6">Your Problem</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <Textarea
                  label="Problem to Solve"
                  value={formData.problem}
                  onChange={(e) => setFormData({...formData, problem: e.target.value})}
                  placeholder="Enter your math problem, science question, or any problem you need help with..."
                  rows={8}
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
                
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    loading={loading}
                    disabled={loading}
                    fullWidth
                  >
                    Solve Problem
                  </Button>
                  {solution && (
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
            
            {/* Example Problems */}
            <Card className="mt-6 bg-purple-50 border-purple-200">
              <h3 className="font-semibold text-gray-900 mb-3">
                📚 Example Problems
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="p-3 bg-white rounded-lg">
                  <p className="font-medium text-gray-900">Mathematics:</p>
                  <p className="text-gray-600 mt-1">Solve: 2x + 5 = 13</p>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <p className="font-medium text-gray-900">Science:</p>
                  <p className="text-gray-600 mt-1">Explain the water cycle process</p>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <p className="font-medium text-gray-900">English:</p>
                  <p className="text-gray-600 mt-1">Identify the parts of speech in: "The quick brown fox jumps"</p>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Solution Display */}
          <div>
            {loading ? (
              <Card>
                <Loading text="Solving your problem..." />
              </Card>
            ) : solution ? (
              <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <h3 className="text-xl font-semibold text-gray-900">Solution</h3>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="primary">Grade {solution.grade}</Badge>
                    <Badge variant="info">{SUBJECTS.find(s => s.value === solution.subject)?.label}</Badge>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-3">Problem:</h4>
                  <p className="text-gray-700 mb-6 p-4 bg-gray-50 rounded-lg">
                    {solution.problem}
                  </p>
                  
                  <h4 className="font-semibold text-gray-900 mb-3">Step-by-Step Solution:</h4>
                  <div className="prose prose-sm max-w-none">
                    <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                      {solution.solution}
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(solution.solution);
                      alert('Solution copied to clipboard!');
                    }}
                  >
                    📋 Copy Solution
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.print()}
                  >
                    🖨️ Print
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center text-center">
                <div>
                  <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Your solution will appear here</p>
                  <p className="text-sm text-gray-400 mt-2">Enter a problem and click "Solve Problem"</p>
                </div>
              </Card>
            )}
            
            {/* Learning Tips */}
            {solution && (
              <Card className="mt-6 bg-yellow-50 border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-3">
                  💡 Learning Tips
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Read through each step carefully</li>
                  <li>• Try to understand why each step is necessary</li>
                  <li>• Practice similar problems on your own</li>
                  <li>• Ask your teacher if you need clarification</li>
                </ul>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solve;