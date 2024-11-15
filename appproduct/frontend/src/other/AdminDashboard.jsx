import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]); // To store the list of users
  const [loading, setLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null); // To track any errors while fetching users
  const [role, setRole] = useState('');
  // const role = localStorage.getItem('role')
  useEffect(() => {
    setRole(localStorage.getItem('role'))
  }, [])


  const onAddHandle = () => {
    navigate('/add-product')
  }

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUsers = async () => {
      try {
        // Get the admin token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/'); // Redirect if no token is found (user is not logged in)
        }

        // Fetch the user list from the backend
        const response = await axios.get('http://localhost:5001/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        });
        setUsers(response.data); // Set the fetched user data
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
      } finally {
        setLoading(false); // Stop the loading spinner once data is fetched or failed
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleLogout = () => {
    // Clear the token or any other user data from local storage
    localStorage.removeItem('token');

    // Redirect to the login page
    navigate('/');
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        <br />Admin Dashboard
      </Typography>

      {/* Display error message if there's an error */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Display loading spinner while data is being fetched */}
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {/* Display the list of registered users */}
          {
            role &&
            <div>
              <button
                onClick={() =>onAddHandle()}
                className='btn btn-primary
            '>Add Product</button>
            </div>
          }
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Username</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Role</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Logout Button */}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        fullWidth
        sx={{ mt: 3 }}
      >
        Logout
      </Button>
    </Container>
  );
};

export default AdminDashboard;