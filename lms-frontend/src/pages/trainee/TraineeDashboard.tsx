import React, { useEffect, useState } from 'react';
import { BookOpen, GraduationCap, Clock } from 'lucide-react';
import { courseApi, type Course } from '../../api/courseApi';
import { Link } from 'react-router-dom';

const TraineeDashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [myCourses] = useState<Course[]>([]); // In a real app, this would be filtered

  useEffect(() => {
    courseApi.getAll().then(setCourses).catch(console.error);
  }, []);

  const stats = [
    { label: 'Total Courses', value: courses.length, icon: BookOpen, color: 'bg-blue-500' },
    { label: 'My Courses', value: myCourses.length, icon: GraduationCap, color: 'bg-green-500' },
    { label: 'In Progress', value: 0, icon: Clock, color: 'bg-yellow-500' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`p-4 rounded-full ${stat.color} bg-opacity-10`}>
              <div className={`p-2 rounded-full ${stat.color}`}>
                <stat.icon size={24} className="text-white" />
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Courses */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Recent Courses</h2>
          <Link to="/courses" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All →
          </Link>
        </div>
        <div className="space-y-3">
          {courses.slice(0, 3).map((course) => (
            <Link 
              key={course.id} 
              to={`/course/${course.id}`}
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen size={24} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{course.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-1">{course.description}</p>
              </div>
            </Link>
          ))}
          {courses.length === 0 && (
            <p className="text-gray-500 text-center py-8">No courses available yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TraineeDashboard;
