import React,{useState,useEffect,useContext} from 'react';
import './Header.css';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { widgetPositon } from '../mockdata/widgetPosition';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { MyContext } from '../App';


const Header = () => {
    const [open,setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [widgetPos,setWidgetPos] = useState(widgetPositon);
    const { widgetPosition, setWidgetPosition } = useContext(MyContext);

    const handlePopup = (e) => {
        setOpen(!open);
        setAnchorEl(e.currentTarget);
    }

    const handleRadioChange = (type) => {
        let posCopy = Object.assign([], widgetPos);
        posCopy.forEach(ele => {
            if(ele.location === type.location){
                ele['checked'] = true;
            }else{
                ele['checked'] = false;
            }
        })
        setWidgetPos(posCopy);
        setWidgetPosition(posCopy.filter(el => el.checked)[0].location);
    }

    return (
        <div className="app-navbar">
            <div className="app-header">
                <MenuIcon/>
                <span>Forecast Management</span>
            </div>
            <div className="app-controls">
                <span onClick={(e) => handlePopup(e)}>Configure Widget</span>
                <SettingsIcon onClick={(e) => handlePopup(e)}/>
                <LanguageIcon/>
                <PersonIcon/>
                <span>Sameer Agrawal</span>
            </div>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={() => setOpen(false)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                >
                <FormControl style={{padding: '10px'}}>
                    <FormLabel id="widget-group">Select Widget Position</FormLabel>
                    <RadioGroup
                        aria-labelledby="widget-group"
                        defaultValue="center"
                        name="radio-buttons-group"
                    >
                        {widgetPositon.map((ele,index) => {
                        return(
                            <FormControlLabel key={index} value={ele.location} control={<Radio checked={ele.checked} />} label={ele.displayName} onChange={() => handleRadioChange(ele)}/>
                        )
                    })}
                    </RadioGroup>
                </FormControl>
            </Popover>
        </div>
    )
}

export default Header
