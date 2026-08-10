import React, { useEffect, useState } from 'react';
import { adminApi, type UserDto } from '../../api/adminApi';
import { Check, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminUsers: React.FC = () => {
  const [pendingUsers, setPendingUsers] = useState<UserDto[]>([]);

  const fetchUsers = async () => {
    try {
      const data = await adminApi.getPendingUsers();
      setPendingUsers(data);
    } catch (error) {
      toast.error('Failed to load users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleActivate = async (id: string | number) => {
    try {
      await adminApi.activateUser(id);
      toast.success('User activated successfully');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to activate user');
    }
  };

  const handleDisable = async (id: string | number) => {
    try {
      await adminApi.disableUser(id);
      toast.success('User disabled');
      fetchUsers(); // Refresh list. In real app, maybe just update state manually to save call.
    } catch (error) {
      toast.error('Failed to disable user');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">User Management</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 font-semibold text-gray-600">Username</th>
                <th className="p-4 font-semibold text-gray-600">Role</th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
                <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pendingUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                pendingUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-gray-800 font-medium">{user.username}</td>
                    <td className="p-4 text-gray-600">{user.role}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.isActive ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {user.isActive ? 'Active' : 'Pending'}
                      </span>
                    </td>
                    <td className="p-4 text-right flex justify-end gap-2">
                      {!user.isActive && (
                        <button
                          onClick={() => handleActivate(user.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                        >
                          <Check size={16} />
                          Activate
                        </button>
                      )}
                      {user.isActive && (
                         <button
                          onClick={() => handleDisable(user.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                        >
                          <X size={16} />
                          Disable
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
