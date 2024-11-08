import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../pictures/logo.png';

const NavBar = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <AppBar position="static" style={{ backgroundColor: '#87CEEB' }}>
            <Toolbar>
                <img src={logo} alt="MindEase Logo" style={{ width: '50px', marginRight: '10px' }} />
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    MindEase
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/therapy-services">Therapy Services</Button>
                <Button color="inherit" component={Link} to="/self-assessment">Self-Assessment</Button>
                <Button color="inherit" component={Link} to="/resources">Resources</Button>
                {isLoggedIn ? (
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                ) : (
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
