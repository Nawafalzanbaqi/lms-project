import api from './axios';

export interface Course {
  id: number;
  title: string;
  description: string;
  videoUrl?: string;
}

export const courseApi = {
  getAll: async () => {
    const response = await api.get<Course[]>('/courses');
    return response.data;
  },
  getById: async (id: string | number) => {
     const response = await api.get<Course>(`/courses/${id}`);
     return response.data;
  },
  create: async (data: Omit<Course, 'id'>) => {
  const response = await api.post('/courses', {
    title: data.title,
    description: data.description,
    youtubeUrl: data.videoUrl  
  });
  return response.data;
},

  update: async (id: number, data: Partial<Course>) => {
    const response = await api.put(`/courses/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  }
};
