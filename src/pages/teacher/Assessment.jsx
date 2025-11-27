import React, { useState } from 'react';
import { ClipboardList, Plus, X, Download } from 'lucide-react';
import { api } from '../../config/api';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Alert from '../../components/common/Alert';
import Loading from '../../components/common/Loading';
import Badge from '../../components/common/Badge';
import { GRADES, SUBJECTS, ASSESSMENT_TYPES } from '../../utils/constants';

const Assessment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    subject: '',
    grade: '',
    topics: [''],
    num_questions: 10,
    include_marking_scheme: true,
    assessment_type: 'mixed'
  });
  const [assessment, setAssessment] = useState(null);
  
  const handleAddTopic = () => {
    setFormData({
      ...formData,
      topics: [...formData.topics, '']
    });
  };
  
  const handleRemoveTopic = (index) => {
    const newTopics = formData.topics.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      topics: newTopics.length > 0 ? newTopics : ['']
    });
  };
  
  const handleTopicChange = (index, value) => {
    const newTopics = [...formData.topics];
    newTopics[index] = value;
    setFormData({
      ...formData,
      topics: newTopics
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validTopics = formData.topics.filter(t => t.trim());
    
    if (!formData.subject || !formData.grade || validTopics.length === 0) {
      setError('Please fill in all required fields and add at least one topic');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      const response = await api.generateAssessment({
        ...formData,
        topics: validTopics
      });
      setAssessment(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to generate assessment');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDownload = () => {
    if (!assessment) return;
    
    const content = `
${assessment.subject.toUpperCase()} ASSESSMENT
Grade ${assessment.grade}
===========================================================

Topics: ${assessment.topics.join(', ')}
Total Questions: ${assessment.total_questions}
Type: ${assessment.type}

${assessment.assessment}

Generated: ${new Date(assessment.generated_at).toLocaleString()}
    `.trim();
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `assessment-${assessment.subject}-grade-${assessment.grade}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const handleReset = () => {
    setFormData({
      subject: '',
      grade: '',
      topics: [''],
      num_questions: 10,
      include_marking_scheme: true,
      assessment_type: 'mixed'
    });
    setAssessment(null);
    setError('');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <ClipboardList className="w-8 h-8 mr-2 text-primary-600" />
            Generate Assessment
          </h1>
          <p className="text-gray-600">Create tests with automatic marking schemes</p>
        </div>
        
        {error && (
          <Alert type="error" message={error} onClose={() => setError('')} className="mb-4" />
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div>
            <Card>
              <h2 className="text-xl font-semibold mb-6">Assessment Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <Select
                  label="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  options={SUBJECTS}
                  placeholder="Select subject"
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
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topics <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {formData.topics.map((topic, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={topic}
                          onChange={(e) => handleTopicChange(index, e.target.value)}
                          placeholder={`Topic ${index + 1}`}
                          fullWidth
                        />
                        {formData.topics.length > 1 && (
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={() => handleRemoveTopic(index)}
                            icon={<X className="w-4 h-4" />}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleAddTopic}
                    icon={<Plus className="w-4 h-4" />}
                    className="mt-2"
                  >
                    Add Topic
                  </Button>
                </div>
                
                <Input
                  label="Number of Questions"
                  type="number"
                  min="5"
                  max="30"
                  value={formData.num_questions}
                  onChange={(e) => setFormData({...formData, num_questions: parseInt(e.target.value)})}
                />
                
                <Select
                  label="Assessment Type"
                  value={formData.assessment_type}
                  onChange={(e) => setFormData({...formData, assessment_type: e.target.value})}
                  options={ASSESSMENT_TYPES}
                />
                
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.include_marking_scheme}
                    onChange={(e) => setFormData({...formData, include_marking_scheme: e.target.checked})}
                    className="rounded text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">Include marking scheme</span>
                </label>
                
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    loading={loading}
                    disabled={loading}
                    fullWidth
                  >
                    Generate
                  </Button>
                  {assessment && (
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
            
            {/* Tips */}
            <Card className="mt-6 bg-purple-50 border-purple-200">
              <h3 className="font-semibold text-gray-900 mb-3">
                📝 Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Add multiple topics for comprehensive tests</li>
                <li>• Mix question types for better assessment</li>
                <li>• Include marking scheme for easier grading</li>
                <li>• CBC-aligned questions automatically</li>
              </ul>
            </Card>
          </div>
          
          {/* Assessment Display */}
          <div className="lg:col-span-2">
            {loading ? (
              <Card>
                <Loading text="Generating your assessment..." />
              </Card>
            ) : assessment ? (
              <div className="space-y-6">
                {/* Header */}
                <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {assessment.subject.toUpperCase()} Assessment
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="primary">Grade {assessment.grade}</Badge>
                        <Badge variant="info">{assessment.total_questions} Questions</Badge>
                        <Badge variant="success">{assessment.type}</Badge>
                        {assessment.has_marking_scheme && (
                          <Badge variant="warning">With Marking Scheme</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Topics: {assessment.topics.join(', ')}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownload}
                      icon={<Download className="w-4 h-4" />}
                    >
                      Download
                    </Button>
                  </div>
                </Card>
                
                {/* Content */}
                <Card>
                  <div className="prose prose-sm max-w-none">
                    <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                      {assessment.assessment}
                    </div>
                  </div>
                </Card>
                
                {/* Actions */}
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(assessment.assessment);
                      alert('Assessment copied to clipboard!');
                    }}
                  >
                    📋 Copy
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.print()}
                  >
                    🖨️ Print
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleDownload}
                  >
                    💾 Save
                  </Button>
                </div>
                
                {/* Info */}
                <Alert
                  type="success"
                  title="Assessment Ready!"
                  message="Your CBC-aligned assessment is ready to use. You can print, save, or copy it."
                />
              </div>
            ) : (
              <Card className="h-full flex items-center justify-center text-center">
                <div className="py-12">
                  <ClipboardList className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Create Your Assessment
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Fill in the details to generate a professional assessment
                  </p>
                  <div className="max-w-md mx-auto">
                    <Alert
                      type="info"
                      message="Assessments include clear instructions, well-structured questions, and optional marking schemes!"
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

export default Assessment;