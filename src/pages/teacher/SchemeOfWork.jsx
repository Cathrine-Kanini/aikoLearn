import React, { useState } from 'react';
import { Calendar, Download } from 'lucide-react';
import { api } from '../../config/api';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Alert from '../../components/common/Alert';
import Loading from '../../components/common/Loading';
import Badge from '../../components/common/Badge';
import { GRADES, SUBJECTS, TERMS } from '../../utils/constants';

const SchemeOfWork = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    subject: '',
    grade: '',
    term: 1,
    num_weeks: 12
  });
  const [scheme, setScheme] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.subject || !formData.grade) {
      setError('Please fill in all required fields');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      const response = await api.generateSchemeOfWork(formData);
      setScheme(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to generate scheme of work');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDownload = () => {
    if (!scheme) return;
    
    const content = `
SCHEME OF WORK
==============

Subject: ${scheme.subject}
Grade: ${scheme.grade}
Term: ${scheme.term}
Duration: ${scheme.weeks} weeks

${scheme.scheme_of_work}

Generated: ${new Date(scheme.generated_at).toLocaleString()}
    `.trim();
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scheme-of-work-${scheme.subject}-grade-${scheme.grade}-term-${scheme.term}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const handleReset = () => {
    setFormData({
      subject: '',
      grade: '',
      term: 1,
      num_weeks: 12
    });
    setScheme(null);
    setError('');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Calendar className="w-8 h-8 mr-2 text-primary-600" />
            Generate Scheme of Work
          </h1>
          <p className="text-gray-600">Create comprehensive term schemes in minutes</p>
        </div>
        
        {error && (
          <Alert type="error" message={error} onClose={() => setError('')} className="mb-4" />
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div>
            <Card>
              <h2 className="text-xl font-semibold mb-6">Scheme Details</h2>
              
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
                
                <Select
                  label="Term"
                  value={formData.term}
                  onChange={(e) => setFormData({...formData, term: parseInt(e.target.value)})}
                  options={TERMS}
                />
                
                <Input
                  label="Number of Weeks"
                  type="number"
                  min="8"
                  max="14"
                  value={formData.num_weeks}
                  onChange={(e) => setFormData({...formData, num_weeks: parseInt(e.target.value)})}
                  helperText="Typical term is 12-13 weeks"
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
                  {scheme && (
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
            
            {/* Info */}
            <Card className="mt-6 bg-green-50 border-green-200">
              <h3 className="font-semibold text-gray-900 mb-3">
                📅 What's Included
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Week-by-week breakdown</li>
                <li>• Learning outcomes per week</li>
                <li>• Key questions and activities</li>
                <li>• Resources needed</li>
                <li>• Assessment methods</li>
                <li>• CBC competencies & values</li>
              </ul>
            </Card>
            
            {/* Tips */}
            <Card className="mt-6 bg-blue-50 border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-3">
                💡 Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Review and adjust to your context</li>
                <li>• Align with school calendar</li>
                <li>• Consider local resources</li>
                <li>• Share with colleagues</li>
              </ul>
            </Card>
          </div>
          
          {/* Scheme Display */}
          <div className="lg:col-span-2">
            {loading ? (
              <Card>
                <Loading text="Generating your scheme of work..." />
                <p className="text-center text-sm text-gray-500 mt-4">
                  This may take a moment...
                </p>
              </Card>
            ) : scheme ? (
              <div className="space-y-6">
                {/* Header */}
                <Card className="bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Scheme of Work
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="primary">
                          {SUBJECTS.find(s => s.value === scheme.subject)?.label}
                        </Badge>
                        <Badge variant="info">Grade {scheme.grade}</Badge>
                        <Badge variant="success">Term {scheme.term}</Badge>
                        <Badge variant="warning">{scheme.weeks} Weeks</Badge>
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
                      {scheme.scheme_of_work}
                    </div>
                  </div>
                </Card>
                
                {/* Actions */}
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(scheme.scheme_of_work);
                      alert('Scheme of work copied to clipboard!');
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
                
                {/* Success Message */}
                <Alert
                  type="success"
                  title="Scheme Generated Successfully!"
                  message="Your CBC-aligned scheme of work is ready. Review and customize as needed for your classroom."
                />
              </div>
            ) : (
              <Card className="h-full flex items-center justify-center text-center">
                <div className="py-12">
                  <Calendar className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Plan Your Term
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Generate a complete scheme of work for the entire term
                  </p>
                  <div className="max-w-md mx-auto">
                    <Alert
                      type="info"
                      message="Get a week-by-week breakdown with learning outcomes, activities, resources, and assessments!"
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

export default SchemeOfWork;