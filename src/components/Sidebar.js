import React from 'react';
import './DetailPage.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
    return (
        <div className="sidebar-container">
            <Link className="custom-link " to="/" ><ArrowBackIcon style={{color: '#fff'}}/></Link>
        </div>
    )
}
