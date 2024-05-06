import React,{useState,useEffect,useContext} from 'react';
import './DetailPage.css';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Divider from './Divider';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import DetailedGraph from './DetailedGraph';
import { MyContext } from '../App';
import { StackContext } from './DetailPage';
import { landingPageCardData } from '../mockdata/landingPageCard';

export const DetailedScreen = ({id}) => {

    const [specialRequirement, setSpecialRequirement] = useState(true);

    const { sideNavOpen, setSideNavOpen } = useContext(MyContext);
    const { selectedStack, setSelectedStack } = useContext(StackContext);

    const toggleSideNav = () => {
        setSideNavOpen(!sideNavOpen)
    }

    useEffect(() => {
        window.addEventListener('resize', handleScreenSizeChange);
    }, [])

    const handleScreenSizeChange = () => {
        if (window.innerWidth < 800) {
            setSideNavOpen(false);
          }else{
            setSideNavOpen(true);
          }
    }
    
    return (
        <div className="detailed-screen-container">
            <div className="detailed-header">
                <button className="toggle-sidebar-btn" style={{padding: 0}} onClick={() => toggleSideNav()}>{sideNavOpen ? <FastRewindIcon/> : <FastForwardIcon/> }</button>
                <WarningAmberIcon/>
                <span>Stack {selectedStack.stackId}</span>
                <Divider height = "50px"/>
                <span>Stack Id: {selectedStack.stackId}</span>
                <div className="forecast-percent-display">
                    <div className="forecast-1">
                        <span>Historic Forecast</span>
                        <span>{selectedStack.histForecastPercent} %</span>
                    </div>
                    <div className="forecast-1">
                        <span>Futrure Forecast.</span>
                        <span>{selectedStack.futureForecastPercent} %</span>
                    </div>
                </div>
                <FlagOutlinedIcon/>
                <h4>City : {landingPageCardData.filter(el => el.id == id)[0]?.city}</h4>
            </div>
            <div className="detailed-subheader">
                <span>Special Requirement</span>
                <div style={{marginLeft: '20px'}}>
                    <FormGroup>
                        <FormControlLabel  control={<Switch defaultChecked/>} label="INCLUDE" onChange={(e) => setSpecialRequirement(e.target.checked)}   />
                    </FormGroup>
                </div>
                <Divider height = "30px"/>
                <KeyboardArrowDownOutlinedIcon style={{marginLeft: '20px'}}/>
            </div>
            <div className="detailed-graph-container">
                <DetailedGraph id = {id} specialRequirement={specialRequirement}/>
            </div>
            <div className="detailed-table-container"></div>
        </div>
    )
}
