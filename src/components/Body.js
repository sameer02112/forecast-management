import React from 'react';
import MapComponent from './googlemapcomponents/MapComponent';
import { LandingPage } from './LandingPage';
import { Outlet } from 'react-router';

export const Body = () => {
    return (
       <Outlet/>
    )
}

export const MainContainer = () => {
    return(
        <div className="main-container">
            <MapComponent />
            <LandingPage />
        </div>
    )
}

