import api from './api';

export interface Course {
  id: number;
  title: string;
  description: string;
  youtubeUrl: string;
}

export interface CreateCourseRequest {
  title: string;
  description: string;
  youtubeUrl: string;
}

export interface UpdateCourseRequest {
  id: number;
  title: string;
  description: string;
  youtubeUrl: string;
}

export const getCourses = async (): Promise<Course[]> => {
  const response = await api.get<Course[]>('/Courses');
  return response.data;
};

export const getCourseById = async (id: number): Promise<Course> => {
  const response = await api.get<Course>(`/Courses/${id}`);
  return response.data;
};

export const createCourse = async (course: CreateCourseRequest): Promise<Course> => {
  const response = await api.post<Course>('/Courses', course);
  return response.data;
};

export const updateCourse = async (id: number, course: UpdateCourseRequest): Promise<void> => {
  await api.put(`/Courses/${id}`, course);
};

export const deleteCourse = async (id: number): Promise<void> => {
  await api.delete(`/Courses/${id}`);
};
