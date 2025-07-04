import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Spinner from '../atoms/Spinner';
import Sidebar from '../organism/Sidebar';
import '../../styles/AddUsers.css';
import '../../styles/Spinner.css';

const AddUser = () => {
  //create references to access input element
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (clicked) return;

    setClicked(true);
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    setError('');
    setMessage('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name && email) {
      //if both the value is there
      if (!emailRegex.test(email)) {
        setError('Invalid email.');
        setMessage('');
        setClicked(false);
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
        if (nameRef.current) nameRef.current.value = '';
        if (emailRef.current) emailRef.current.value = '';
        setClicked(false);
        setTimeout(() => {
          navigate('/users');
        }, 1500);
      } catch (error) {
        console.error('error adding user', error);
        setError('error in adding user');
        setMessage('');
        setClicked(false);
      }
    } else {
      setError('Enter both name and email.');
      setMessage('');
      setClicked(false);
    }
  };
  return (
    <div>
      <Sidebar />
      <h2>Add User</h2>
      <form onSubmit={handleAdd}>
        <div className="adduser">
          <input ref={nameRef} placeholder="Name" />
          <input ref={emailRef} placeholder="Email" />
          <button type="submit" disabled={clicked}>
            {clicked ? <Spinner /> : 'Add'}
          </button>

          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default AddUser;
