import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import logo from '@/assets/pictures/logo.png'
import {useAuth} from "../services/AuthProvider.jsx";

const NavBar = () => {
    const {isAuthenticated, logout} = useAuth();
    return (
        <AppBar position="static" style={{ backgroundColor: '#87CEEB' }}>
            <Toolbar>
                <a href="/"><img src={logo} alt="MindEase Logo" style={{ width: '50px', marginRight: '10px' }} /></a>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    <a href="/" style={{color: 'inherit', textDecoration: 'inherit'}}>MindEase</a>
                </Typography>

                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/therapy-services">Therapy Services</Button>
                <Button color="inherit" component={Link} to="/self-assessment">Self-Assessment</Button>
                <Button color="inherit" component={Link} to="/resources">Resources</Button>
                {!isAuthenticated ?
                    <Button color="inherit" component={Link} to="/Login">Authenticate</Button>
                    :
                    <Button color="inherit" onClick={logout}>Logout</Button>
                }
            </Toolbar>
        </AppBar>
    )
}

export default NavBar
