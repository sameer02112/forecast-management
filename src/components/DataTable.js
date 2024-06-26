import React,{useState,useEffect,useContext} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { graphData } from '../mockdata/graphData';
import { MyContext } from '../App';
  
export const DataTable = ({id}) => {

    const[tableData, setTableData] = useState(graphData);
    const[quarters, setQuarters] = useState([]);
    const { sideNavOpen, setSideNavOpen } = useContext(MyContext);

    useEffect(() => {
        constructTable();
    },[])

    const constructTable = () => {
        const quarters = graphData[0].data.map(item => item.quarter);

        let rowArr = [];
        let currData = graphData[id].data;
        rowArr.push(["AI F'CAST",...currData.map(item => item.aiForecast)]);
        rowArr.push(["Final F'CAST",...currData.map(item => item.finalForecast)]);
        rowArr.push(["Hist F'CAST",...currData.map(item => item.histAiForecast)]);
        rowArr.push(["Pre Qtr F'CAST",...currData.map(item => item.prevQtrForecast)]);
        rowArr.push(['Consumption',...currData.map(item => item.consumption)]);
        setTableData(rowArr);
        setQuarters(quarters)
    }

    return (
        <div style={{width: sideNavOpen ? '80%' : '100%'}}>
            <TableContainer component={Paper} >
            <Table size="small" aria-label="a dense table" style={{backgroundColor: '#c9c9c9', color: '#fff'}}>
                <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    {quarters.map((ele) => {
                        return <TableCell align="right">{ele}</TableCell>
                    })}
                </TableRow>
                </TableHead>
                <TableBody>
                {tableData?.map((row) => (
                    <TableRow>
                        {row?.length > 0 && row?.map((el,i) => {
                            return(
                                <TableCell size="small" align={i==0 ? 'left' : 'center'} >{el ? el : 0}</TableCell>
                            )
                        })}
                    </TableRow>
                ))}
                </TableBody>
      </Table>
    </TableContainer>
        </div>
    )
}
