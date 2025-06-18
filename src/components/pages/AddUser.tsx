import React, { useRef } from 'react';

import Sidebar from '../molecules/Sidebar';

const AddUser = () => {//create references to access input element
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;

    if (name && email) {//if both the value is there
      const users = JSON.parse(localStorage.getItem('users') || '[]');//access local existing users 
      users.push({ name, email });//add into the esxisting user
      localStorage.setItem('users', JSON.stringify(users));//save in local storage
      alert('User added');
    }
  };

  return (
    <div>
        <Sidebar/>
      <h2>Add User</h2>
      <input ref={nameRef} placeholder="Name" />
      <input ref={emailRef} placeholder="Email" />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default AddUser;
