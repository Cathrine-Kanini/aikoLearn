import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Brain,
  Sparkles,
  Globe,
  TrendingUp,
  CheckCircle
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { USER_TYPES } from '../utils/constants';

const Home = () => {
  const navigate = useNavigate();
  const [selectedUserType, setSelectedUserType] = useState(null);
  
  const handleUserTypeSelect = (userType) => {
    setSelectedUserType(userType);
    localStorage.setItem('userType', userType);
    navigate(`/${userType}/dashboard`);
  };
  
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'AI-Powered Learning',
      description: 'Get instant, intelligent answers to all your questions'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Multilingual Support',
      description: 'Learn in English or Kiswahili, your choice'
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'CBC Aligned',
      description: 'Fully aligned with Kenya\'s Competency-Based Curriculum'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Track Progress',
      description: 'Monitor learning progress and identify areas to improve'
    }
  ];
  
  const benefits = [
    'Generate practice quizzes instantly',
    'Get homework help without direct answers',
    'Create lesson plans in minutes',
    'Access step-by-step problem solving',
    'Generate assessments with marking schemes',
    'Explore topics with real-world examples'
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Learning Platform</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              CBC Learning Assistant
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Empowering Kenyan students and teachers with AI-driven tools 
              for smarter, faster, and more engaging learning experiences.
            </p>
            
            {/* User Type Selection */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              {USER_TYPES.map((type) => (
                <Card 
                  key={type.value}
                  hover
                  className="w-full sm:w-64 cursor-pointer transition-all duration-200 hover:scale-105"
                  onClick={() => handleUserTypeSelect(type.value)}
                >
                  <div className="text-center">
                    <div className="text-5xl mb-3">{type.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {type.label}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {type.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
            
            <p className="text-sm text-gray-500">
              Select your role to get started
            </p>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-200 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary-200 rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose CBC Assistant?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cutting-edge technology meets educational excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Everything You Need to Succeed
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                From personalized learning paths to comprehensive teaching tools, 
                we've got you covered at every step of your educational journey.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <Card className="bg-gradient-to-br from-primary-500 to-primary-700 text-white p-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">17 Features</h3>
                      <p className="text-sm text-primary-100">Comprehensive toolkit</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">For Everyone</h3>
                      <p className="text-sm text-primary-100">Students & Teachers</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">CBC Aligned</h3>
                      <p className="text-sm text-primary-100">Grades 4-8</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Transform Your Learning Experience?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of students and teachers already using CBC Assistant
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary"
              size="lg"
              onClick={() => handleUserTypeSelect('student')}
            >
              I'm a Student
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => handleUserTypeSelect('teacher')}
              className="border-white text-white hover:bg-white hover:text-primary-600"
            >
              I'm a Teacher
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;