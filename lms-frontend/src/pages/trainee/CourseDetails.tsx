import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courseApi, type Course } from '../../api/courseApi';
import { ArrowLeft, PlayCircle } from 'lucide-react';

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    if (id) {
      courseApi.getById(id)
        .then(setCourse)
        .catch(() => navigate('/courses'))
        .finally(() => setLoading(false));
    }
  }, [id, navigate]);

  // Helper to extract YouTube ID
  const getEmbedUrl = (url: string) => {
    try {
        if (!url) return '';
        const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
        return `https://www.youtube.com/embed/${videoId}`;
    } catch {
        return url;
    }
  };

  const handleEnroll = () => {
    // In a real app, this would make an API call
    setEnrolled(true);
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Loading course...</div>
      </div>
    );
  }

  if (!course) return null;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Courses
      </button>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        {/* Video Player */}
        <div className="aspect-video bg-black relative">
          {course.videoUrl ? (
            <iframe
              width="100%"
              height="100%"
              src={getEmbedUrl(course.videoUrl)}
              title={course.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0"
            ></iframe>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
              <PlayCircle size={80} className="text-white opacity-50" />
            </div>
          )}
        </div>

        {/* Course Info */}
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
              <p className="text-gray-600 leading-relaxed text-lg">{course.description}</p>
            </div>
          </div>

          {/* Enroll Button */}
          <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
            {enrolled ? (
              <div className="flex items-center gap-2 px-6 py-3 bg-green-100 text-green-700 rounded-lg font-medium">
                <PlayCircle size={20} />
                Enrolled - Start Learning
              </div>
            ) : (
              <button
                onClick={handleEnroll}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
              >
                Enroll Now
              </button>
            )}
            <div className="text-gray-500 text-sm">
              Free Course • Self-paced
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
