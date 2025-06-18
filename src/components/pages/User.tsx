import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../atoms/Button';
import Sidebar from '../molecules/Sidebar';

import '../../styles/User.css';

type UserProps ={
  key: number
  id: number
  name: string
  email: string
}

const User = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserProps[]>([]);

  useEffect(() => {
    //fetch users from API
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className='user'>
      <Sidebar />
      <h2>User List</h2>
      <div className='adduser'>
        <Button label="Add User" onClick={() => navigate('/add-user')} />
      </div>
      {/* if user exist then display it in the talbe */}
      {users.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Sr. no.</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((props: UserProps, index: number) => (
              //displays user name email
              <tr>
                <td>{index + 1}</td>
                <td>{props.name}</td>
                <td>{props.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users</p> //if there is no user
      )}
    </div>
  );
};

export default User;
