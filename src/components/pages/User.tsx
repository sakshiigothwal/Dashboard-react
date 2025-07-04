import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Spinnersvg from '../../images/spinner.svg';
import Button from '../atoms/Button';
import Spinner from '../atoms/Spinner';
import Sidebar from '../organism/Sidebar';

import '../../styles/User.css';

type UserProps = {
  id: number;
  name: string;
  email: string;
};

const User = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<number | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        'https://685b7af589952852c2d9ab22.mockapi.io/api/users',
      );
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //fetch users from API
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    setDeleting(id);
    try {
      await axios.delete(
        `${'https://685b7af589952852c2d9ab22.mockapi.io/api/users'}/${id}`,
      );
      fetchUsers(); // refresh list
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setDeleting(null);
    }
  };

  const handleEdit = (user: UserProps) => {
    navigate(`/edit-user/${user.id}`, { state: user });
  };

  return (
    <div className="user">
      <Sidebar />
      <h2>User List</h2>
      <div className="adduserbtn">
        <Button label="Add User" onClick={() => navigate('/add-user')} />
      </div>
      {/* if user exist then display it in the talbe */}
      {loading ? (
        <div className="spinner-container">
          <img src={Spinnersvg} alt="Loading..." className="spinner" />
        </div>
      ) : users.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Sr. no.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((props: UserProps, index: number) => (
              //displays user name email
              <tr key={props.id}>
                <td>{index + 1}</td>
                <td>{props.name}</td>
                <td>{props.email}</td>
                <td className="buttons">
                  <Button label="Edit" onClick={() => handleEdit(props)} />
                  <Button
                    label={deleting === props.id ? <Spinner /> : 'Delete'}
                    onClick={() => handleDelete(props.id)}
                    disabled={deleting === props.id}
                  />
                </td>
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
