import React from 'react'

const CustomLegend = ({color,type}) => {
    if(type){
        return(
            <div style={{height: '10px', width: '3px', borderLeft: '3px dotted', borderColor: color, marginRight: '10px'}}></div>
        )
    }
    return (
        <div style={{height: '10px', width: '3px', backgroundColor: color, marginRight: '10px'}}></div>
    )
}

export default CustomLegend
