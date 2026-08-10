import React, { useEffect, useState } from 'react';
import { courseApi, type Course } from '../../api/courseApi';
import { Plus, Edit, Trash2, Video } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Modal from '../../components/Modal';

const AdminCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Partial<Course>>({});

  const fetchCourses = async () => {
    try {
      const data = await courseApi.getAll();
      setCourses(data);
    } catch (error) {
      console.error("Failed to load courses", error); // Suppress toast on load if empty, optional
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await courseApi.delete(id);
      setCourses(courses.filter(c => c.id !== id));
      toast.success('Course deleted');
    } catch (error) {
      toast.error('Failed to delete course');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && currentCourse.id) {
        await courseApi.update(currentCourse.id, currentCourse);
        toast.success('Course updated');
      } else {
        await courseApi.create(currentCourse as any);
        toast.success('Course created');
      }
      setIsModalOpen(false);
      fetchCourses();
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const openModal = (course?: Course) => {
    if (course) {
      setIsEditing(true);
      setCurrentCourse(course);
    } else {
      setIsEditing(false);
      setCurrentCourse({ title: '', description: '', videoUrl: '' });
    }
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Courses</h1>
        <button
          onClick={() => openModal()}
          className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          Add Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
             {/* Thumbnail placeholder if no video thumb available, or standard pattern */}
            <div className="h-40 bg-gray-100 flex items-center justify-center relative">
               <Video size={40} className="text-gray-300" />
               {course.videoUrl && <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">Video</div>}
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg text-gray-800 mb-2 truncate">{course.title}</h3>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">{course.description}</p>
              <div className="flex justify-end gap-2 pt-4 border-t border-gray-50">
                <button
                  onClick={() => openModal(course)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? 'Edit Course' : 'New Course'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              value={currentCourse.title || ''}
              onChange={(e) => setCurrentCourse({ ...currentCourse, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none h-24 resize-none"
              value={currentCourse.description || ''}
              onChange={(e) => setCurrentCourse({ ...currentCourse, description: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Video URL (YouTube)</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              value={currentCourse.videoUrl || ''}
              onChange={(e) => setCurrentCourse({ ...currentCourse, videoUrl: e.target.value })}
              placeholder="https://youtube.com/..."
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {isEditing ? 'Save Changes' : 'Create Course'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminCourses;
