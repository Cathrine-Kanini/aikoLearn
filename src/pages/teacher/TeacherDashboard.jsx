import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TEACHER_FEATURES } from '../../utils/constants';
import Card from '../../components/common/Card';
import { BookOpen } from 'lucide-react';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-2 mb-4">
            <BookOpen className="w-6 h-6 text-primary-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Teacher Dashboard
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Access professional teaching tools and resources
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {TEACHER_FEATURES.map((feature) => (
            <Card 
              key={feature.id}
              hover
              className="cursor-pointer transition-all duration-200 hover:scale-105"
              onClick={() => navigate(feature.path)}
            >
              <div className="flex flex-col h-full">
                <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center text-3xl mb-4`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 text-sm flex-grow">
                  {feature.description}
                </p>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="text-primary-600 text-sm font-medium hover:text-primary-700">
                    Create now →
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Quick Tips */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              👨‍🏫 Teacher Tips
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Generate lesson plans in seconds with CBC alignment</li>
              <li>• Create custom assessments with automatic marking schemes</li>
              <li>• Build complete term schemes of work efficiently</li>
              <li>• Generate detailed progress reports for students</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;