import React, { useState } from 'react';
import { TrendingUp, Plus, X, Download } from 'lucide-react';
import { api } from '../../config/api';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Alert from '../../components/common/Alert';
import Loading from '../../components/common/Loading';
import Badge from '../../components/common/Badge';
import { GRADES, SUBJECTS } from '../../utils/constants';

const ProgressReport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    student_name: '',
    grade: '',
    subject: '',
    quiz_scores: [],
    topics_covered: [''],
    strengths: [''],
    areas_to_improve: ['']
  });
  const [report, setReport] = useState(null);
  
  const handleAddItem = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    });
  };
  
  const handleRemoveItem = (field, index) => {
    const newItems = formData[field].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [field]: newItems.length > 0 ? newItems : ['']
    });
  };
  
  const handleItemChange = (field, index, value) => {
    const newItems = [...formData[field]];
    newItems[index] = value;
    setFormData({
      ...formData,
      [field]: newItems
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validTopics = formData.topics_covered.filter(t => t.trim());
    const validStrengths = formData.strengths.filter(s => s.trim());
    const validAreas = formData.areas_to_improve.filter(a => a.trim());
    
    if (!formData.student_name || !formData.grade || !formData.subject) {
      setError('Please fill in all required fields');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      const response = await api.generateProgressReport({
        student_name: formData.student_name,
        grade: formData.grade,
        subject: formData.subject,
        quiz_scores: formData.quiz_scores,
        topics_covered: validTopics,
        strengths: validStrengths,
        areas_to_improve: validAreas
      });
      setReport(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to generate progress report');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDownload = () => {
    if (!report) return;
    
    const content = `
STUDENT PROGRESS REPORT
=======================

Student: ${report.student}
Average Score: ${report.average_score.toFixed(1)}%

${report.report}

Generated: ${new Date().toLocaleString()}
    `.trim();
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `progress-report-${report.student.replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const handleReset = () => {
    setFormData({
      student_name: '',
      grade: '',
      subject: '',
      quiz_scores: [],
      topics_covered: [''],
      strengths: [''],
      areas_to_improve: ['']
    });
    setReport(null);
    setError('');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <TrendingUp className="w-8 h-8 mr-2 text-primary-600" />
            Generate Progress Report
          </h1>
          <p className="text-gray-600">Create detailed student progress reports</p>
        </div>
        
        {error && (
          <Alert type="error" message={error} onClose={() => setError('')} className="mb-4" />
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div>
            <Card>
              <h2 className="text-xl font-semibold mb-6">Student Information</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Student Name"
                  value={formData.student_name}
                  onChange={(e) => setFormData({...formData, student_name: e.target.value})}
                  placeholder="Enter student name"
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
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topics Covered
                  </label>
                  <div className="space-y-2">
                    {formData.topics_covered.map((topic, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={topic}
                          onChange={(e) => handleItemChange('topics_covered', index, e.target.value)}
                          placeholder={`Topic ${index + 1}`}
                          fullWidth
                        />
                        {formData.topics_covered.length > 1 && (
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={() => handleRemoveItem('topics_covered', index)}
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
                    onClick={() => handleAddItem('topics_covered')}
                    icon={<Plus className="w-4 h-4" />}
                    className="mt-2"
                  >
                    Add Topic
                  </Button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Strengths
                  </label>
                  <div className="space-y-2">
                    {formData.strengths.map((strength, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={strength}
                          onChange={(e) => handleItemChange('strengths', index, e.target.value)}
                          placeholder={`Strength ${index + 1}`}
                          fullWidth
                        />
                        {formData.strengths.length > 1 && (
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={() => handleRemoveItem('strengths', index)}
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
                    onClick={() => handleAddItem('strengths')}
                    icon={<Plus className="w-4 h-4" />}
                    className="mt-2"
                  >
                    Add Strength
                  </Button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Areas to Improve
                  </label>
                  <div className="space-y-2">
                    {formData.areas_to_improve.map((area, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={area}
                          onChange={(e) => handleItemChange('areas_to_improve', index, e.target.value)}
                          placeholder={`Area ${index + 1}`}
                          fullWidth
                        />
                        {formData.areas_to_improve.length > 1 && (
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={() => handleRemoveItem('areas_to_improve', index)}
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
                    onClick={() => handleAddItem('areas_to_improve')}
                    icon={<Plus className="w-4 h-4" />}
                    className="mt-2"
                  >
                    Add Area
                  </Button>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    loading={loading}
                    disabled={loading}
                    fullWidth
                  >
                    Generate Report
                  </Button>
                  {report && (
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
          </div>
          
          {/* Report Display */}
          <div className="lg:col-span-2">
            {loading ? (
              <Card>
                <Loading text="Generating progress report..." />
              </Card>
            ) : report ? (
              <div className="space-y-6">
                {/* Header */}
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Progress Report
                      </h2>
                      <p className="text-lg text-gray-700 mb-3">
                        Student: <span className="font-semibold">{report.student}</span>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="success" size="lg">
                          Average: {report.average_score.toFixed(1)}%
                        </Badge>
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
                      {report.report}
                    </div>
                  </div>
                </Card>
                
                {/* Actions */}
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(report.report);
                      alert('Report copied to clipboard!');
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
                  <TrendingUp className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Create Progress Report
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Enter student information to generate a comprehensive report
                  </p>
                  <div className="max-w-md mx-auto">
                    <Alert
                      type="info"
                      message="Reports include overall performance, subject progress, CBC competencies, and recommendations!"
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

export default ProgressReport;