import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courseApi, type Course } from '../api/courseApi';
import { ArrowLeft } from 'lucide-react';
import Loading from '../components/Loading';

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      courseApi.getById(id)
        .then(setCourse)
        .catch(() => navigate('/courses'))
        .finally(() => setLoading(false));
    }
  }, [id, navigate]);

  if (loading) return <Loading />;
  if (!course) return null;

  // Helper to extract YouTube ID (simplistic)
  const getEmbedUrl = (url: string) => {
    try {
        if (!url) return '';
        const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
        return `https://www.youtube.com/embed/${videoId}`;
    } catch {
        return url;
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-primary mb-6 transition-colors">
        <ArrowLeft size={20} />
        Back to Courses
      </button>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <div className="aspect-video bg-black">
          <iframe
            width="100%"
            height="100%"
            src={getEmbedUrl(course.videoUrl || '')}
            title={course.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
          <p className="text-gray-600 leading-relaxed text-lg">{course.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
