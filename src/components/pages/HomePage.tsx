import React from 'react';

import '../../styles/HomePage.css'
import Sidebar from '../molecules/Sidebar';

const HomePage = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';//checks login status
  return (
    <div >
      {isLoggedIn && <Sidebar />}{/*show sidebar only if the user is logged in*/}
    <div className='home'>

      <h1>Dashboard Home Page</h1>
    </div>
    </div>
  );
};

export default HomePage;

