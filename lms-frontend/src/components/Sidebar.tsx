import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, BookOpen, LogOut } from 'lucide-react';
import clsx from 'clsx';

const Sidebar: React.FC = () => {
  const { role, logout } = useAuth();

  const links = role === 'Admin' ? [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/users', label: 'Users', icon: Users },
    { to: '/admin/courses', label: 'Courses', icon: BookOpen },
  ] : [
    { to: '/courses', label: 'All Courses', icon: BookOpen },
  ];

  return (
    <div className="h-screen w-64 bg-dark text-white fixed left-0 top-0 flex flex-col shadow-lg z-10 transition-all duration-300">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-primary">LMS Portal</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => clsx(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200",
              isActive ? "bg-primary text-white shadow-md" : "text-gray-400 hover:bg-gray-800 hover:text-white"
            )}
          >
            <link.icon size={20} />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button onClick={logout} className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-gray-800 rounded-lg transition-colors">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
