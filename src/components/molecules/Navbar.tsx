import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../styles/Navbar.css';

import Search from '../../images/search.svg';
import Button from '../atoms/Button';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';//check whether loggedin or not
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    alert('blogs or user will be searched');
  };
  const handleRegister = () => {
    navigate('/register');
  };
  const handleLogin = () => {
    navigate('/login');
  };
  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');//set login status to false
    navigate('/');
  };

  return (
    <nav className="navbar">
      <h2 className="header">Dashboard</h2>
      <input
        type="text"
        placeholder="Search users or blogs"
        value={search}
        onChange={(event) => setSearch(event.target.value)}//update search input
      />
      <Button
        label={<img src={Search} alt="" className="search" />}
        onClick={handleSearch}
      />
      {!isLoggedIn ? (
        <Button label="LogIn" onClick={handleLogin} />
      ) : (
        <Button label="LogOut" onClick={handleLogout} />
      )}
      <Button label="Register" onClick={handleRegister} />
    </nav>
  );
};

export default Navbar;
