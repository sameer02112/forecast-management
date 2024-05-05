import React,{useState, useEffect, useContext} from 'react';
import './DetailPage.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { customTabs } from '../mockdata/customTabs';
import { sidebarTabData } from '../mockdata/customTabs';
import Checkbox from '@mui/material/Checkbox';
import EmailIcon from '@mui/icons-material/Email';
import { MyContext } from '../App';
import { StackContext } from './DetailPage';


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export const Sidebar = () => {

    const [value, setValue] = React.useState(0);
    const [sidebarData, setSidebarData] = useState([]);

    const { sideNavOpen } = useContext(MyContext);
    const { selectedStack, setSelectedStack } = useContext(StackContext);

    const handleChange = (event, newValue) => {
    setValue(newValue);
    }

    useEffect(() => {
      handleSidebarData();
    }, [value])

    const handleSidebarData = () => {
      let data = value == 0 ? sidebarTabData['Backlog'] : value == 1 ? sidebarTabData['Pending'] : sidebarTabData['Final Sign-Off'];
      setSelectedStack(data[0]);
      setSidebarData(data)
    }

    const handleSidebarCheckboxChange = (data) => {
      let tempData = Object.assign([],sidebarData);
      tempData.forEach(ele=>{
       if(ele.stackId == data.stackId){
         ele['checked'] = true;
       }else{
         ele['checked'] = false;
       }
     })
      setSidebarData(tempData);
      setSelectedStack(data);
    }
    

    return (
        <div className="sidebar-container" style={{display: sideNavOpen ? 'inherit' : 'none'}}>

            <Link className="custom-link " to="/" ><ArrowBackIcon style={{color: '#fff', fontSize: '34px'}}/></Link>

            <span style={{marginTop: '20px'}}>Available Stack</span>

            <Box sx={{ width: 'fit-content' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                     {customTabs.map(tab =>  <Tab label={tab.text + " (" + sidebarTabData[tab.text].length + ")"} {...a11yProps(tab.id)} />)}
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={value}> 
            <div class="detail-page-filter">
                <span >Filter</span>
                <FilterListIcon style={{marginLeft: '10px'}}/>
            </div>
            <div className="sidebar-list-container">
            {sidebarData.map((ele,index) => {
              return(
                <div className="sidenavCardContainer">
                     <Checkbox
                      sx={{
                        color: 'white',
                        '&.Mui-checked': {
                          color: 'white',
                        },
                      }}
                        checked={ele.checked}
                        onChange={() => handleSidebarCheckboxChange(ele)}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                      <div className="sidenavText">
                        <div className="sidenavTextChild">
                          <span>{ele.value1}</span>
                          <span style={{marginLeft: '5px'}}>{ele.value2}</span>
                        </div>
                        <p>Stack : {ele.stackId}</p>
                      </div>
                      <EmailIcon fontSize="small"/>
                      
                </div>
              )
            })}
            </div>
            </CustomTabPanel>
            </Box>

            
         </div>
    )
}
