import React from 'react';
import { Card } from './Card';
import { userData } from '../mockdata/user';
import { landingPageCardData } from '../mockdata/landingPageCard';
import { Link } from 'react-router-dom';
import './Body.css';

export const LandingPage = () => {
    return (
        <div className="landing-page-container">
            <h2 className="landing-page-header">Hello {userData.firstName + " " + userData.lastName}, </h2>
            <div className="landing-page-card-container">
                {landingPageCardData.map(card => {
                    return <Link className="custom-link" to={'/detail?id=' + card.id} key={card.id}><Card data = {card}/></Link>
                })}
            </div>
        </div>
    )
}
