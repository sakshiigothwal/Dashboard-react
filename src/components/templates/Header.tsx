import React from 'react';

import '../../styles/Header.css';
import Navbar from '../molecules/Navbar';

const Header = () => {
  return (
    <div>
      {/* renders navbar component */}
      <header className="header">
        <Navbar />
      </header>
    </div>
  );
};

export default Header;
