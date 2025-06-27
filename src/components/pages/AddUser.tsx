import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Spinnersvg from '../../images/spinner.svg';
import Sidebar from '../molecules/Sidebar';
import '../../styles/AddUsers.css';

const AddUser = () => {
  //create references to access input element
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  const handleAdd = async () => {
    if (clicked) return;

    setClicked(true);
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name && email) {
      //if both the value is there
      if (!emailRegex.test(email)) {
        setError('Invalid email.');
        setMessage('');
        return;
      }
      try {
        await axios.post(
          'https://685b7af589952852c2d9ab22.mockapi.io/api/users',
          {
            name,
            email,
          },
        );
        setMessage('user added!');
        setError(' ');
        setTimeout(() => navigate('/users'), 1000);
      } catch (error) {
        console.error('error adding user', error);
        setError('error in adding user');
        setMessage('');
      }
    } else {
      setError('Enter both name and email.');
      setMessage('');
    }
  };
  return (
    <div>
      <Sidebar />
      <h2>Add User</h2>
      <div className="adduser">
        <input ref={nameRef} placeholder="Name" />
        <input ref={emailRef} placeholder="Email" />
        <button onClick={handleAdd} disabled={clicked}>
          {clicked ? (
            <img src={Spinnersvg} alt="adding" width={40} height={40} />
          ) : (
            'Add'
          )}
        </button>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default AddUser;
