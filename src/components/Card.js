import React,{useState,useEffect} from 'react';
import './Body.css';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { landingPageCardData } from '../mockdata/landingPageCard';
import { LineChart, Line, Tooltip } from 'recharts';
import { graphData } from '../mockdata/graphData';



export const Card = (props) => {
    let {id,city,forecastValue,forecastPercent} = props.data;

    const [gData,setGData] = useState([]);

    useEffect(()=>{
        handleGraphData();
    },[])

    const handleGraphData = () => {
        let cityArr = graphData?.filter(el => el.id == id);
        if(cityArr.length > 0){
            setGData(cityArr[0].data.slice(0,10))
        }
    }
    
    return (
        <div className="card-container"> 
            <h3 style={{fontSize: '28px'}}>{city}</h3>
            <span>Forecast</span>
            <div className="card-forecast-value-container">
                <span>{forecastValue/1000} M</span>
                <LineChart width={100} height={50} data={gData}>
                  <Tooltip/>
                  <Line type="monotone" dataKey="consumption" stroke="#8884d8"/>
                </LineChart>
                <span><TrendingUpIcon style={{color: 'green'}}/></span>
            </div>
            <span>Forecast</span>
            <div className="card-forecast-percent-container">
                <span>{forecastPercent} %</span>
                <LineChart width={100} height={50} data={gData}>
                  <Tooltip/>
                  <Line type="monotone" dataKey="consumption" stroke="#8884d8" />
                </LineChart>
                <span><TrendingDownIcon style={{color: 'red'}}/></span>
            </div>
        </div>
    )
}
