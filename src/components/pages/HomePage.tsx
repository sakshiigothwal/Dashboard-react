import React from 'react';

import '../../styles/HomePage.css';
import Button from '../atoms/Button';
import Cards from '../molecules/Cards';
import Sidebar from '../molecules/Sidebar';

const HomePage: React.FC = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; //checks login status

  const totalUsers = 34;
  const totalBlogs = 27;
  return (
    <div className="dashboard">
      {isLoggedIn && <Sidebar />}
      <div className="container">
        <div className="home">
          <h1 className="welcome">Welcome </h1>

          <div className="cardbox">
            <Cards title="Users" description={String(totalUsers)} />
            <Cards title="Blogs" description={String(totalBlogs)} />
          </div>

          <div className="actions">
            <Button
              label="View All Users"
              onClick={() => (window.location.href = '/users')}
            />
            <Button
              label="View All Blogs"
              onClick={() => (window.location.href = '/blogs')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
