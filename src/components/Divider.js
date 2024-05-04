import React from 'react'

const Divider = ({height,color}) => {
    console.log(color)
    return (
        <div style={{height: height, borderLeft: color ? color : '1px solid black', marginLeft: '20px'}}>
        </div>
    )
}

export default Divider
