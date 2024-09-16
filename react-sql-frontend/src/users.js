import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]);  // State to store the list of users
  const [name, setName] = useState('');    // State to store the name for the new user
  const [email, setEmail] = useState('');  // State to store the email for the new user
  const [message, setMessage] = useState('');  // State to store the success/failure message

  // Fetch users from the backend when the component loads
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users');
        setUsers(response.data);  // Set the users state with the fetched data
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();  // Call the fetch function
  }, []);

  // Handle form submission to add a new user
  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      Name: name,
      Email: email
    };

    try {
      const response = await axios.post('http://localhost:3001/users', userData);
      setMessage(`User added successfully! ID: ${response.data.id}`);
      
      // Add the new user to the users list without refetching the entire list
      setUsers([...users, { id: response.data.id, Name: name, Email: email }]);

      // Clear form fields
      setName('');
      setEmail('');
    } catch (error) {
      console.error('Error adding user:', error);
      setMessage('Failed to add user.' + error);
    }
    
  };

  return (
    <div>
      <h2>Users List</h2>

      {/* Display list of users */}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.Name} ({user.Email})
          </li>
        ))}
      </ul>

      <h2>Add a New User</h2>
      {/* Form to add a new user */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add User</button>
      </form>

      {/* Display success or error message */}
      {message && <p>{message}</p>}
    </div>
  );
}

export default Users;
