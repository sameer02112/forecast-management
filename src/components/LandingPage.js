import React,{useContext,useState,useEffect} from 'react';
import { Card } from './Card';
import { userData } from '../mockdata/user';
import { landingPageCardData } from '../mockdata/landingPageCard';
import { Link } from 'react-router-dom';
import './Body.css';
import { MyContext } from '../App';


export const LandingPage = () => {
    const { widgetPosition } = useContext(MyContext);    
    const offsetVal = widgetPosition == 'top' ? '50%' : widgetPosition == 'center' ? '25%' : '0';
    useEffect(()=>{
        handleOffset();
    })

    const [style,setStyle] = useState({});

    const handleOffset = () => {
        let styleObj = {};
        if(widgetPosition == 'top'){
            styleObj['top'] = 0;
        }
        else if(widgetPosition == 'bottom'){
            styleObj['bottom'] = 0;
        }
        else if(widgetPosition == 'center'){
            styleObj['bottom'] = '25%';
        }
        setStyle(styleObj)
    }

    return (
        <div className="landing-page-container" style={style}>
            <h2 className="landing-page-header">Hello {userData.firstName + " " + userData.lastName}, </h2>
            <div className="landing-page-card-container">
                {landingPageCardData.map(card => {
                    return <Link className="custom-link" to={'/detail?id=' + card.id} key={card.id}><Card data = {card}/></Link>
                })}
            </div>
        </div>
    )
}
