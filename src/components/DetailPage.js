import React,{useContext, useState} from 'react';
import { useSearchParams } from 'react-router-dom';
import { DetailedScreen } from './DetailedScreen';
import { Sidebar } from './Sidebar';
import { MyContext } from '../App';

const DetailPage = () => {
    const [searchParam] = useSearchParams();
    let cityId = searchParam.get('id');

    const [sideNavOpen, setSideNavOpen] = useState(true);

    return (
        <div className="detail-page-container">
             <MyContext.Provider value={{ sideNavOpen, setSideNavOpen }}>
                <Sidebar/>
                <DetailedScreen id={cityId}/>
             </MyContext.Provider>
           
        </div>
    )
}

export default DetailPage
