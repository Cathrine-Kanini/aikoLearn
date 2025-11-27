import React, { useState } from 'react';
import { FileText, Download, Clock } from 'lucide-react';
import { api } from '../../config/api';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Alert from '../../components/common/Alert';
import Loading from '../../components/common/Loading';
import Badge from '../../components/common/Badge';
import { GRADES, SUBJECTS, LANGUAGES } from '../../utils/constants';

const LessonPlan = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    subject: '',
    grade: '',
    topic: '',
    duration_minutes: 40,
    language: 'en'
  });
  const [lessonPlan, setLessonPlan] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.subject || !formData.grade || !formData.topic) {
      setError('Please fill in all required fields');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      const response = await api.generateLessonPlan(formData);
      setLessonPlan(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to generate lesson plan');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDownload = () => {
    if (!lessonPlan) return;
    
    const content = `
LESSON PLAN
===========

Subject: ${lessonPlan.lesson_plan.subject}
Grade: ${lessonPlan.lesson_plan.grade}
Topic: ${lessonPlan.lesson_plan.topic}
Duration: ${lessonPlan.lesson_plan.duration_minutes} minutes

${lessonPlan.lesson_plan.content}

Generated: ${new Date(lessonPlan.created_at).toLocaleString()}
    `.trim();
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lesson-plan-${lessonPlan.lesson_plan.topic.replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const handleReset = () => {
    setFormData({
      subject: '',
      grade: '',
      topic: '',
      duration_minutes: 40,
      language: 'en'
    });
    setLessonPlan(null);
    setError('');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <FileText className="w-8 h-8 mr-2 text-primary-600" />
            Generate Lesson Plan
          </h1>
          <p className="text-gray-600">Create CBC-aligned lesson plans in seconds</p>
        </div>
        
        {error && (
          <Alert type="error" message={error} onClose={() => setError('')} className="mb-4" />
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div>
            <Card>
              <h2 className="text-xl font-semibold mb-6">Lesson Details</h2>
              
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
                
                <Input
                  label="Topic"
                  value={formData.topic}
                  onChange={(e) => setFormData({...formData, topic: e.target.value})}
                  placeholder="e.g., Introduction to Fractions"
                  required
                />
                
                <Input
                  label="Duration (minutes)"
                  type="number"
                  min="20"
                  max="120"
                  value={formData.duration_minutes}
                  onChange={(e) => setFormData({...formData, duration_minutes: parseInt(e.target.value)})}
                  icon={<Clock className="w-4 h-4" />}
                />
                
                <Select
                  label="Language"
                  value={formData.language}
                  onChange={(e) => setFormData({...formData, language: e.target.value})}
                  options={LANGUAGES}
                />
                
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    loading={loading}
                    disabled={loading}
                    fullWidth
                  >
                    Generate
                  </Button>
                  {lessonPlan && (
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
            <Card className="mt-6 bg-blue-50 border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-3">
                💡 Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Be specific with your topic</li>
                <li>• Standard lesson is 40 minutes</li>
                <li>• Plans are fully CBC-aligned</li>
                <li>• Download for offline use</li>
              </ul>
            </Card>
          </div>
          
          {/* Lesson Plan Display */}
          <div className="lg:col-span-2">
            {loading ? (
              <Card>
                <Loading text="Generating your lesson plan..." />
              </Card>
            ) : lessonPlan ? (
              <div className="space-y-6">
                {/* Header */}
                <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {lessonPlan.lesson_plan.topic}
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="primary">
                          {SUBJECTS.find(s => s.value === lessonPlan.lesson_plan.subject)?.label}
                        </Badge>
                        <Badge variant="info">Grade {lessonPlan.lesson_plan.grade}</Badge>
                        <Badge variant="success">{lessonPlan.lesson_plan.duration_minutes} mins</Badge>
                      </div>
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
                      {lessonPlan.lesson_plan.content}
                    </div>
                  </div>
                </Card>
                
                {/* Actions */}
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(lessonPlan.lesson_plan.content);
                      alert('Lesson plan copied to clipboard!');
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
              </div>
            ) : (
              <Card className="h-full flex items-center justify-center text-center">
                <div className="py-12">
                  <FileText className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Ready to Create
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Fill in the details and generate your lesson plan
                  </p>
                  <div className="max-w-md mx-auto">
                    <Alert
                      type="info"
                      message="Plans include learning outcomes, activities, resources, assessment methods, and more!"
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

export default LessonPlan;