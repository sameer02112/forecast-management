import React from 'react';
import './Body.css';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

export const Card = (props) => {
    let {city,forecastValue,forecastPercent} = props.data;
    return (
        <div className="card-container"> 
            <h3 style={{fontSize: '28px'}}>{city}</h3>
            <span>Forecast</span>
            <div className="card-forecast-value-container">
                <span>{forecastValue/1000} M</span>
                <span>Graph here..</span>
                <span><TrendingUpIcon style={{color: 'green'}}/></span>
            </div>
            <span>Forecast</span>
            <div className="card-forecast-percent-container">
                <span>{forecastPercent} %</span>
                <span>Graph here..</span>
                <span><TrendingDownIcon style={{color: 'red'}}/></span>
            </div>
        </div>
    )
}
