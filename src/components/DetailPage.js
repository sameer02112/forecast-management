import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { DetailedScreen } from './DetailedScreen';
import { Sidebar } from './Sidebar';

const DetailPage = () => {
    const [searchParam] = useSearchParams();
    return (
        <div className="detail-page-container">
           {/* <h1>{searchParam.get('id')}</h1>  */}
           <Sidebar/>
           <DetailedScreen/>
        </div>
    )
}

export default DetailPage
