import React,{useState, createContext} from 'react';
import { useSearchParams } from 'react-router-dom';
import { DetailedScreen } from './DetailedScreen';
import { Sidebar } from './Sidebar';
import { MyContext } from '../App';
import { sidebarTabData } from '../mockdata/customTabs';

export const StackContext = createContext();

const DetailPage = () => {
    const [searchParam] = useSearchParams();
    let cityId = searchParam.get('id');

    const [sideNavOpen, setSideNavOpen] = useState(true);
    const [selectedStack, setSelectedStack] = useState(sidebarTabData['Backlog'][0]);

    return (
        <div className="detail-page-container">
            <StackContext.Provider value = {{selectedStack, setSelectedStack}}>
                <MyContext.Provider value={{ sideNavOpen, setSideNavOpen }}>
                    <Sidebar/>
                    <DetailedScreen id={cityId}/>
                </MyContext.Provider>
            </StackContext.Provider>
           
        </div>
    )
}

export default DetailPage
