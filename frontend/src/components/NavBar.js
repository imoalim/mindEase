import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import logo from '../pictures/logo.png'; // Korrigierter Pfad zum Logo

const NavBar = () => {
    return (
        <AppBar position="static" style={{ backgroundColor: '#87CEEB' }}>
            <Toolbar>
                <img src={logo} alt="MindEase Logo" style={{ width: '50px', marginRight: '10px' }} />
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    MindEase
                </Typography>
                <Button color="inherit">Home</Button>
                <Button color="inherit">Therapy Services</Button>
                <Button color="inherit">Self-Assessment</Button>
                <Button color="inherit">Resources</Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
