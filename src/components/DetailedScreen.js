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

export const DetailedScreen = ({id}) => {

    const { sideNavOpen, setSideNavOpen } = useContext(MyContext);

    const toggleSideNav = () => {
        setSideNavOpen(!sideNavOpen)
    }
    return (
        <div className="detailed-screen-container">
            <div className="detailed-header">
                <button className="toggle-sidebar-btn" style={{padding: 0}} onClick={() => toggleSideNav()}>{sideNavOpen ? <FastRewindIcon/> : <FastForwardIcon/> }</button>
                <WarningAmberIcon/>
                <span>Sample Stack</span>
                <Divider height = "50px"/>
                <span>Stack Id: 93232323232</span>
                <div className="forecast-percent-display">
                    <div className="forecast-1">
                        <span>Forecast</span>
                        <span>82%</span>
                    </div>
                    <div className="forecast-1">
                        <span>Forecast</span>
                        <span>87%</span>
                    </div>
                </div>
                <FlagOutlinedIcon/>
            </div>
            <div className="detailed-subheader">
                <span>Special Requirement</span>
                <div style={{marginLeft: '20px'}}>
                    <FormGroup>
                        <FormControlLabel control={<Switch />} label="INCLUDE" />
                    </FormGroup>
                </div>
                <Divider height = "30px"/>
                <KeyboardArrowDownOutlinedIcon style={{marginLeft: '20px'}}/>
            </div>
            <div className="detailed-graph-container">
                <DetailedGraph id = {id}/>
            </div>
            <div className="detailed-table-container"></div>
        </div>
    )
}
