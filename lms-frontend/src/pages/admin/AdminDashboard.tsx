import React, { useEffect, useState } from 'react';
import { Users, BookOpen, Clock, Activity } from 'lucide-react';
import { adminApi } from '../../api/adminApi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    pendingUsers: 0,
    totalCourses: 0
  });

  useEffect(() => {
    adminApi.getStats().then((data: any) => setStats(data)).catch(console.error);
  }, []);

  const data = [
    { name: 'Users', total: stats.totalUsers, active: stats.activeUsers, pending: stats.pendingUsers },
  ];

  const cards = [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'bg-blue-500' },
    { label: 'Active Users', value: stats.activeUsers, icon: Activity, color: 'bg-green-500' },
    { label: 'Pending Users', value: stats.pendingUsers, icon: Clock, color: 'bg-yellow-500' },
    { label: 'Total Courses', value: stats.totalCourses, icon: BookOpen, color: 'bg-indigo-500' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard Overview</h1>
      
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`p-4 rounded-full ${card.color} bg-opacity-10 text-${card.color.replace('bg-', '')} text-white`}>
              <div className={`p-2 rounded-full ${card.color}`}>
                <card.icon size={24} className="text-white" />
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-sm">{card.label}</p>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
  <h2 className="text-xl font-bold mb-4 text-gray-800">User Analytics</h2>

  {/* FIX HEIGHT */}
  <div style={{ width: "100%", height: 320 }}>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#3b82f6" name="Total Users" />
        <Bar dataKey="active" fill="#22c55e" name="Active Users" />
        <Bar dataKey="pending" fill="#eab308" name="Pending Users" />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>

    </div>
  );
};

export default AdminDashboard;
