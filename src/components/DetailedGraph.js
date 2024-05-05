import React,{useState,useEffect,useContext} from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label ,ReferenceLine, ReferenceArea} from 'recharts';
import { graphData } from '../mockdata/graphData';
import Divider from './Divider';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CustomLegend from './CustomLegend';
import { StackContext } from './DetailPage';
import { DataTable } from './DataTable';

const DetailedGraph = ({id, specialRequirement}) => {
  const [aiForecast,setAiForecast] = useState(true);
  const [finalForecast, setFinalForecast] = useState(true);
  const [confidenceInterval, setConfidenceInterval] = useState(true);

  const { selectedStack } = useContext(StackContext);

    return (
        <div>
          <div className="graph-switchs-level1">
            <span>Forecast Horizion</span>
            <span>Latest Issue</span>
            <Divider height="10px" color="#fff"/>
            <FormGroup>
                <FormControlLabel control={<Switch defaultChecked/>} label="Show confidence interval" onChange={(e) => setConfidenceInterval(e.target.checked)}  />
            </FormGroup>
          </div>
          <div className="graph-switchs-level2">
            <CustomLegend color="green"/>
            <FormGroup>
                  <FormControlLabel control={<Switch defaultChecked/>} label= "AI Forecast" onChange={(e) => setAiForecast(e.target.checked)} />
            </FormGroup>
            <CustomLegend color="yellow"/>
            <FormGroup>
                <FormControlLabel control={<Switch defaultChecked/>} label="Final Forecast" onChange={(e) => setFinalForecast(e.target.checked)}/>
            </FormGroup>
            <CustomLegend color="blue"/>
            <span style={{paddingRight: '40px'}}>Consumption</span>
            <CustomLegend color="green" type="dotted"/>
            <span>AI Forecast</span>
            <CustomLegend color="yellow" type="dotted"/>
            <span>Final Forecast</span>
            <CustomLegend color="orange" type="dotted"/>
            <span>Previous Quarter Final Forecast</span>
          </div>


          <div className="chart-container">
            <RechartComponent width={1200} height={400}  id={id} aiForecast={aiForecast} finalForecast={finalForecast} selectedStack={selectedStack} specialRequirement={specialRequirement} confidenceInterval={confidenceInterval}/>
          </div>
          <div className="data-table">
            {/* Data table component */}
            <DataTable id={id}/>
          </div>
      </div>
    )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{`Quarter : ${label}`}</p>
        <p>{`AI Forecast : ${payload[0]?.value}`}</p>
        <p>{`Consumption : ${payload[1]?.value}`}</p>
        <p>{`Final Forecast : ${payload[2]?.value}`}</p>
      </div>
    );
  }

  return null;
};

const RechartComponent = ({id,aiForecast,finalForecast,selectedStack, specialRequirement, confidenceInterval}) => {

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
            <YAxis type="number">
              <Label value="Consumption (FT,Thousands)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            {aiForecast && <Line type="monotone" dataKey="histAiForecast" stroke="green"/>}
            <Line type="monotone" dataKey="consumption" stroke="yellow" />
            {finalForecast && <Line type="monotone" dataKey="histFinalForecast" stroke="blue" />}
            {aiForecast && <Line type="monotone" dataKey="aiForecast" stroke="yellow"  strokeDasharray="5 5"/>}
            {finalForecast && <Line type="monotone" dataKey="finalForecast" stroke="yellow"  strokeDasharray="5 5"/>}
            <Line type="monotone" dataKey="prevQtrForecast" stroke="orange"  strokeDasharray="5 5"/>

            {specialRequirement && 
              <ReferenceLine
                isFront
                y={selectedStack.specialRequirement}
                stroke="orange"
                strokeDasharray="3 3"/>}

            {confidenceInterval && 
              <ReferenceLine
                isFront
                x={selectedStack.confidenceInterval}
                stroke="#c9c9c9"
                strokeWidth={3}
                strokeDasharray="5 5"/>}

          </LineChart>
      </ResponsiveContainer> 
      
    );
  };
  

export default DetailedGraph
