import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Remove BrowserRouter
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';

// Student Pages
import Chat from './pages/student/Chat';
import Quiz from './pages/student/Quiz';
import Homework from './pages/student/Homework';
import DailyTip from './pages/student/DailyTip';
import Solve from './pages/student/Solve';
import Explore from './pages/student/Explore';

// Teacher Pages
import LessonPlan from './pages/teacher/LessonPlan';
import Assessment from './pages/teacher/Assessment';
import SchemeOfWork from './pages/teacher/SchemeOfWork';
import ProgressReport from './pages/teacher/ProgressReport';

function App() {
  return (
    <Layout>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />
        
        {/* Student Routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/chat" element={<Chat />} />
        <Route path="/student/quiz" element={<Quiz />} />
        <Route path="/student/homework" element={<Homework />} />
        <Route path="/student/daily-tip" element={<DailyTip />} />
        <Route path="/student/solve" element={<Solve />} />
        <Route path="/student/explore" element={<Explore />} />
        
        {/* Teacher Routes */}
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/lesson-plan" element={<LessonPlan />} />
        <Route path="/teacher/assessment" element={<Assessment />} />
        <Route path="/teacher/scheme" element={<SchemeOfWork />} />
        <Route path="/teacher/progress" element={<ProgressReport />} />
        
        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;