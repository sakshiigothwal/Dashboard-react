import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../molecules/Sidebar';
import '../../styles/AddUsers.css';


const AddUser = () => {
  //create references to access input element
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAdd = async () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;

    if (name && email) {
      //if both the value is there
      try {
        await axios.post(
          'https://685b7af589952852c2d9ab22.mockapi.io/api/users',
          {
            name,
            email,
          },
        );
        setMessage('user added!');
        setTimeout(() => navigate('/users'), 1500);
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
      <input ref={nameRef} placeholder="Name" />
      <input ref={emailRef} placeholder="Email" />
      <button onClick={handleAdd}>Add</button>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AddUser;
