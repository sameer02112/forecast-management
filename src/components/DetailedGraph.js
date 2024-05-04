import React,{useState,useEffect} from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';
import { graphData } from '../mockdata/graphData';
import Divider from './Divider';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CustomLegend from './CustomLegend';

const DetailedGraph = ({id}) => {
    return (
        <div>
          <div className="graph-switchs-level1">
            <span>Forecast Horizion</span>
            <span>Latest Issue</span>
            <Divider height="10px" color="#fff"/>
            <FormGroup>
                <FormControlLabel control={<Switch />} label="Show confidence interval" />
            </FormGroup>
          </div>
          <div className="graph-switchs-level2">
            <CustomLegend color="green"/>
            <FormGroup>
                  <FormControlLabel control={<Switch />} label= "AI Forecast" />
            </FormGroup>
            <CustomLegend color="yellow"/>
            <FormGroup>
                <FormControlLabel control={<Switch />} label="Final Forecast" />
            </FormGroup>
            <CustomLegend color="blue"/>
            <span>Consumption</span>
          </div>


          <div className="chart-container">
            <RechartComponent width={1200} height={400}  id={id}/>
          </div>
          <div className="data-table">
            {/* Data table component */}
          </div>
      </div>
    )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{`Quarter : ${label}`}</p>
        <p>{`AI Forecast : ${payload[0].value}`}</p>
        <p>{`Consumption : ${payload[1].value}`}</p>
        <p>{`Final Forecast : ${payload[2].value}`}</p>
      </div>
    );
  }

  return null;
};


const CustomizedDot = (props) => {
    const { cx, cy } = props;
  
    return (
      <g>
        <line x1={cx} y1={cy} x2={cx} y2={cy} stroke="black" strokeDasharray="3 3" />
        <circle cx={cx} cy={cy} r={4} fill="white" stroke="black" strokeWidth={2} />
      </g>
    );
  };

const RechartComponent = ({id}) => {

    const[data,setData] = useState([]);

    useEffect(()=>{
        handleGraphData();
    },[])

    const handleGraphData = () => {
        let cityArr = graphData?.filter(el => el.id == id);
        if(cityArr.length > 0){
            setData(cityArr[0].data);
        }
    }
   
    return (
      <ResponsiveContainer width={'95%'} height={400}>
        <LineChart data={data}>
            <CartesianGrid strokeDasharray="1 1" vertical={true} horizontal={false}/>
            <XAxis dataKey="quarter" />
            <YAxis>
              <Label value="Consumption (FT,Thousands)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            {/* <Legend /> */}
            <Line type="monotone" dataKey="histAiForecast" stroke="green"/>
            <Line type="monotone" dataKey="consumption" stroke="yellow" />
            <Line type="monotone" dataKey="histFinalForecast" stroke="blue" />
            <Line type="monotone" dataKey="aiForecast" stroke="yellow"  strokeDasharray="5 5"/>
            <Line type="monotone" dataKey="finalForecast" stroke="yellow"  strokeDasharray="5 5"/>
            <Line type="monotone" dataKey="prevQtrForecast" stroke="orange"  strokeDasharray="5 5"/>
          </LineChart>
      </ResponsiveContainer>
      
    );
  };
  




export default DetailedGraph
