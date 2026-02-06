import React from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { username, role } = useAuth();

  return (
    <div className="h-16 bg-white shadow-sm flex items-center justify-end px-8 fixed top-0 right-0 left-64 z-10">
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-800">{username}</p>
          <p className="text-xs text-gray-500">{role}</p>
        </div>
        <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
          {username?.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
