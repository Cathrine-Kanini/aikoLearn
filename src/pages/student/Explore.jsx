import React, { useState } from 'react';
import { Compass, Search, BookOpen, Lightbulb, TrendingUp, AlertTriangle, Zap } from 'lucide-react';
// import { api } from '../../config/Api';
import { api } from '../../config/api';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Alert from '../../components/common/Alert';
import Loading from '../../components/common/Loading';
import Badge from '../../components/common/Badge';
import { GRADES, SUBJECTS } from '../../utils/constants';

const Explore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    topic: '',
    grade: '',
    subject: ''
  });
  const [exploration, setExploration] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.topic || !formData.grade || !formData.subject) {
      setError('Please fill in all required fields');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      const response = await api.exploreTopic(
        formData.topic,
        formData.grade,
        formData.subject
      );
      setExploration(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to explore topic');
    } finally {
      setLoading(false);
    }
  };
  
  const handleReset = () => {
    setFormData({
      topic: '',
      grade: '',
      subject: ''
    });
    setExploration(null);
    setError('');
  };
  
  const popularTopics = [
    { subject: 'math', topics: ['Fractions', 'Algebra', 'Geometry', 'Decimals'] },
    { subject: 'science', topics: ['Photosynthesis', 'Energy', 'Matter', 'Solar System'] },
    { subject: 'english', topics: ['Verbs', 'Adjectives', 'Essay Writing', 'Reading Comprehension'] },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Compass className="w-8 h-8 mr-2 text-primary-600" />
            Explore Topics
          </h1>
          <p className="text-gray-600">Deep dive into any concept with detailed explanations</p>
        </div>
        
        {error && (
          <Alert type="error" message={error} onClose={() => setError('')} className="mb-4" />
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Search Form */}
          <div className="lg:col-span-1">
            <Card>
              <h2 className="text-xl font-semibold mb-6">Search Topic</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Topic Name"
                  value={formData.topic}
                  onChange={(e) => setFormData({...formData, topic: e.target.value})}
                  placeholder="e.g., Photosynthesis, Fractions..."
                  icon={<Search className="w-4 h-4" />}
                  required
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
                    icon={<Compass className="w-4 h-4" />}
                  >
                    Explore
                  </Button>
                  {exploration && (
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
            
            {/* Popular Topics */}
            <Card className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                🔥 Popular Topics
              </h3>
              <div className="space-y-4">
                {popularTopics.map((item, idx) => (
                  <div key={idx}>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      {SUBJECTS.find(s => s.value === item.subject)?.label}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.topics.map((topic, topicIdx) => (
                        <button
                          key={topicIdx}
                          onClick={() => setFormData({...formData, topic, subject: item.subject})}
                          className="text-xs px-3 py-1 bg-primary-100 text-primary-700 rounded-full hover:bg-primary-200 transition-colors"
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          
          {/* Exploration Display */}
          <div className="lg:col-span-2">
            {loading ? (
              <Card>
                <Loading text="Exploring topic..." />
              </Card>
            ) : exploration ? (
              <div className="space-y-6">
                {/* Header */}
                <Card className="bg-gradient-to-r from-primary-50 to-purple-50 border-primary-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {exploration.topic}
                      </h2>
                      <div className="flex gap-2">
                        <Badge variant="primary">Grade {formData.grade}</Badge>
                        <Badge variant="info">{SUBJECTS.find(s => s.value === formData.subject)?.label}</Badge>
                        {exploration.has_curriculum_content && (
                          <Badge variant="success">CBC Aligned</Badge>
                        )}
                      </div>
                    </div>
                    <BookOpen className="w-8 h-8 text-primary-600" />
                  </div>
                </Card>
                
                {/* Exploration Content */}
                <Card>
                  <div className="prose prose-sm max-w-none">
                    <div className="text-gray-800 whitespace-pre-wrap leading-relaxed space-y-6">
                      {exploration.exploration.split('\n\n').map((section, idx) => {
                        // Check for numbered sections
                        const match = section.match(/^(\d+)\.\s*(.+?):\s*(.+)$/s);
                        if (match) {
                          const [, number, title, content] = match;
                          
                          // Icon mapping
                          const icons = {
                            '1': <BookOpen className="w-5 h-5" />,
                            '2': <Lightbulb className="w-5 h-5" />,
                            '3': <TrendingUp className="w-5 h-5" />,
                            '4': <Zap className="w-5 h-5" />,
                            '5': <AlertTriangle className="w-5 h-5" />,
                            '6': <Compass className="w-5 h-5" />
                          };
                          
                          return (
                            <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                              <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                                  {icons[number] || <BookOpen className="w-5 h-5" />}
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                                  <p className="text-gray-700">{content.trim()}</p>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        
                        return (
                          <p key={idx} className="text-gray-700">
                            {section}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </Card>
                
                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(exploration.exploration);
                      alert('Content copied to clipboard!');
                    }}
                  >
                    📋 Copy Content
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.print()}
                  >
                    🖨️ Print
                  </Button>
                </div>
              </div>
            ) : (
              <Card className="h-full flex items-center justify-center text-center">
                <div className="py-12">
                  <Compass className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Start Exploring
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Enter a topic to get detailed explanations
                  </p>
                  <div className="max-w-md mx-auto">
                    <Alert
                      type="info"
                      message="You'll get a simple explanation, real-world applications, related topics, and more!"
                    />
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;