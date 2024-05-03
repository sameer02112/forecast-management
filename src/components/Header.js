import React from 'react';
import './Header.css';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import PersonIcon from '@mui/icons-material/Person';


const Header = () => {
    return (
        <div className="app-navbar">
            <div className="app-header">
                <MenuIcon/>
                <span>Forecast Management</span>
            </div>
            <div className="app-controls">
                <LanguageIcon/>
                <PersonIcon/>
                <span>Sameer Agrawal</span>
            </div>
        </div>
    )
}

export default Header
