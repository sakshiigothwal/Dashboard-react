import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <ul>
        {/* on click navigate to paths */}
        <li onClick={() => navigate('/')}>Home</li>
        <li onClick={() => navigate('/users')}>Users</li>
        <li onClick={() => navigate('/users/1')}>User Details</li>
        <li onClick={() => navigate('/blogs')}>Blog List</li>
        <li onClick={() => navigate('/blogs/1')}>Blog Details</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
