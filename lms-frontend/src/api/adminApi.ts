import { api } from './axios';

export interface UserDto {
  id: string; // or number, depends on backend
  username: string;
  role: string;
  isActive: boolean;
}

export const adminApi = {
  getPendingUsers: async () => {
    const response = await api.get<UserDto[]>('/admin/pending');
    return response.data;
  },
  activateUser: async (id: string | number) => {
    const response = await api.post(`/admin/activate/${id}`);
    return response.data;
  },
  disableUser: async (id: string | number) => {
    const response = await api.post(`/admin/disable/${id}`);
    return response.data;
  },
  getStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  }
};
