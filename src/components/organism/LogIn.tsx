import { signInWithPopup } from 'firebase/auth';
import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { auth, provider } from '../../firebase'; 
import Button from '../atoms/Button';
import Form from '../molecules/Form';

import '../../styles/LogIn.css';

type LoginProps = {
  email: string;
  password: string;
};

const LogIn = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setError((prev) => ({ ...prev, [name]: '' })); //clear the error whenuser is typing
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //fuction to validate
  const validate = () => {
    let valid = true;
    const newError = { email: '', password: '' };
    //email validation
    if (!data.email) {
      newError.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newError.email = 'Email is invalid';
      valid = false;
    }
    //password validation
    if (!data.password) {
      newError.password = 'Password is required';
      valid = false;
    } else if (data.password.length < 8) {
      newError.password = 'Password hast o be at least 8 characters';
      valid = false;
    }

    setError(newError); //if validation fails set an error
    return valid;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault(); //prevent page from setting to default on form submission
    if (validate()) {
      if (validate()) {
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]'); //parse through local storage to get user details

        const matchUser = existingUsers.find(
          // check if the email password matches to any saved user
          (props: LoginProps) =>
            props.email.toLowerCase() === data.email.toLowerCase() &&
            props.password === data.password,
        );

        if (matchUser) {
          // if matches update login status
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('currentUser', JSON.stringify(matchUser));
          navigate('/');
        } else {
          //gives error message if user not matched
          setError((prev) => ({
            ...prev,
            email: 'Invalid email or password',
            password: 'Invalid email or password',
          }));
        }
      }
    }
  };
  //handle google login
  const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const matchUser = existingUsers.find(
      (u: LoginProps) => u.email.toLowerCase() === (user.email || '').toLowerCase()
    );

    if (!matchUser) {
      // if new Google user
      const newUser = {
        email: user.email || '',
        password: '', 
      };
      localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));
    }

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify({ email: user.email }));
    navigate('/');
  } catch (error) {
    console.error('Google login failed', error);
  }
};

  
  return (
    <div className="login">
      <div className="loginbox">
        <form onSubmit={handleSubmit}>
          <Form
            label="Email :"
            name="email"
            type="email"
            placeholder="Enter email"
            value={data.email}
            onChange={handleChange}
            onFocus={() => {}}
            error={error.email}
          />

          <Form
            label="Password :"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={data.password}
            onChange={handleChange}
            onFocus={() => {}}
            error={error.password}
          />

          <Button label="login" type="submit" onClick={() => {}} />
        </form>
        <div className="or">or</div>
        <Button label="Continue with Google" type="button" onClick={handleGoogleLogin} />

      </div>
    </div>
  );
};

export default LogIn;
