import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import AddUser from './components/pages/AddUser';
import BlogDetails from './components/pages/BlogDetails';
import BlogList from './components/pages/BlogList';
import EditUser from './components/pages/EditUser';
import HomePage from './components/pages/HomePage';
import LogInPage from './components/pages/LogInPage';
import Register from './components/pages/Register';
import User from './components/pages/User';
import UserDetails from './components/pages/UserDetails';
import Footer from './components/templates/Footer';
import Header from './components/templates/Header';
// import Sidebar from '../src/components/molecules/Sidebar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true',
  );
  useEffect(() => {
    const interval = setInterval(() => {
      //checks login status every 500ms
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <Router>
        <Header />
        <div className='main'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/register" element={<Register />} />
          {/* only accessible if logged in */}
          <Route
            path="/users"
            element={isLoggedIn ? <User /> : <LogInPage />}
          />
          <Route
            path="/users/:id"
            element={isLoggedIn ? <UserDetails /> : <LogInPage />}
          />
          <Route
            path="/blogs"
            element={isLoggedIn ? <BlogList /> : <LogInPage />}
          />
          <Route
            path="/blogs/:id"
            element={isLoggedIn ? <BlogDetails /> : <LogInPage />}
          />
          <Route
            path="/add-user"
            element={isLoggedIn ? <AddUser /> : <LogInPage />}
          />
          <Route
            path="/edit-user/:id"
            element={isLoggedIn ? <EditUser /> : <LogInPage />}
          />
        </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
