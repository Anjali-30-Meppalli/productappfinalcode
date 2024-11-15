import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, CircularProgress, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { logout, userId } = useAuth();
    const navigate = useNavigate();
    const fetchUserProfile = async (token) => {
        try {
            const response = await axios.get(`http://localhost:5001/user/profile/${token}`, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            setUser(response.data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch user profile. Please try again.');
            // Optionally navigate to login if unauthorized
            if (err.response && err.response.status === 401) {
                logout();
                navigate('/log');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("details"))
        console.log(token._id)
        if (token) {

            fetchUserProfile(token._id);
        }
    }, [localStorage]); // Dependency array

    const handleLogout = () => {
        logout();
        navigate('/log');
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Container>
           <br /><br /> <Typography variant="h4">User Profile</Typography>
            <Typography variant="h6">Username: {user.username}</Typography>
            <Typography variant="h6">Email: {user.email}</Typography>
            <Typography variant="h6">Role: {user.role}</Typography>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
                style={{ marginTop: '20px' }}
            >
                Logout
            </Button>
        </Container>
    );
};

export default UserDashboard;