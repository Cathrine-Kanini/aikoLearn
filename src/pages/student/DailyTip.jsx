import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, RefreshCw } from 'lucide-react';
import { api } from '../../config/api';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Select from '../../components/common/Select';
import Alert from '../../components/common/Alert';
import Loading from '../../components/common/Loading';
import { GRADES, SUBJECTS } from '../../utils/constants';
import { format } from 'date-fns';

const DailyTip = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [config, setConfig] = useState({
    grade: '',
    subject: ''
  });
  const [tip, setTip] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);
  
  const fetchTip = async () => {
    if (!config.grade || !config.subject) {
      setError('Please select grade and subject');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      const response = await api.getDailyTip(config.grade, config.subject);
      setTip(response.data);
      setLastFetched(new Date());
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch daily tip');
    } finally {
      setLoading(false);
    }
  };
  
  // Auto-fetch when grade and subject are selected
  useEffect(() => {
    if (config.grade && config.subject) {
      fetchTip();
    }
  }, [config.grade, config.subject]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Sparkles className="w-8 h-8 mr-2 text-yellow-500" />
            Daily Learning Tip
          </h1>
          <p className="text-gray-600">Learn something new every day!</p>
        </div>
        
        {error && (
          <Alert type="error" message={error} onClose={() => setError('')} className="mb-4" />
        )}
        
        {/* Configuration */}
        <Card className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Grade"
              value={config.grade}
              onChange={(e) => setConfig({...config, grade: e.target.value})}
              options={GRADES}
              placeholder="Select grade"
            />
            <Select
              label="Subject"
              value={config.subject}
              onChange={(e) => setConfig({...config, subject: e.target.value})}
              options={SUBJECTS}
              placeholder="Select subject"
            />
          </div>
        </Card>
        
        {/* Tip Display */}
        {loading ? (
          <Card>
            <Loading text="Fetching today's tip..." />
          </Card>
        ) : tip ? (
          <div className="space-y-6">
            {/* Main Tip Card */}
            <Card className="bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 border-yellow-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-600">
                    {format(new Date(tip.date), 'MMMM dd, yyyy')}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={fetchTip}
                  icon={<RefreshCw className="w-4 h-4" />}
                >
                  Refresh
                </Button>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-5xl mb-4">💡</div>
                <p className="text-lg text-gray-800 leading-relaxed">
                  {tip.tip}
                </p>
              </div>
              
              <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                <span>Grade {tip.grade} • {SUBJECTS.find(s => s.value === tip.subject)?.label}</span>
                {lastFetched && (
                  <span>Updated {format(lastFetched, 'HH:mm')}</span>
                )}
              </div>
            </Card>
            
            {/* Engagement Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-blue-50 border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-3">
                  💪 Challenge Yourself
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  Try to apply today's tip in your next study session. See how it helps!
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Write it down in your notebook</li>
                  <li>• Share it with a friend</li>
                  <li>• Practice using it today</li>
                </ul>
              </Card>
              
              <Card className="bg-green-50 border-green-200">
                <h3 className="font-semibold text-gray-900 mb-3">
                  🎯 Daily Goals
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="rounded text-primary-600" />
                    <span className="text-sm text-gray-700">Read today's tip</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="rounded text-primary-600" />
                    <span className="text-sm text-gray-700">Understand the concept</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="rounded text-primary-600" />
                    <span className="text-sm text-gray-700">Apply it in practice</span>
                  </label>
                </div>
              </Card>
            </div>
            
            {/* Streak Tracker */}
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    🔥 Keep Your Streak Going!
                  </h3>
                  <p className="text-sm text-gray-600">
                    Come back tomorrow for another amazing tip
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">1</div>
                  <div className="text-xs text-gray-600">day streak</div>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <Card className="text-center py-12">
            <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Select grade and subject to see today's tip</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DailyTip;