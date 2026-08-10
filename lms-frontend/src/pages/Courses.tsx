import React, { useEffect, useState } from 'react';
import { courseApi, type Course } from '../api/courseApi';
import { Link } from 'react-router-dom';
import { PlayCircle } from 'lucide-react';

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    courseApi.getAll().then(setCourses).catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link to={`/course/${course.id}`} key={course.id} className="block group">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="h-48 bg-gray-900 relative flex items-center justify-center">
                 {/* Placeholder or thumbnail logic. Using a play icon overlay. */}
                 <PlayCircle size={48} className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-800 mb-2 truncate group-hover:text-primary transition-colors">{course.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2">{course.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Courses;
