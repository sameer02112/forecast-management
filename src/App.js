import React, { createContext, useContext, useState } from 'react';
import './App.css';
import Header from './components/Header';
import DetailPage from './components/DetailPage';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { MainContainer, Body } from './components/Body';
import { sidebarTabData } from './mockdata/customTabs';

export const MyContext = createContext();

const appRouter = createBrowserRouter([{
  path: "/",
  element: <Body/>,
  children: [
    {
      path: "/",
      element: <MainContainer/>
    },
    {
      path: "detail",
      element: <DetailPage/>
    }
  ]
}])

function App() {

  const [widgetPosition, setWidgetPosition] = useState('center');

  return (
      <MyContext.Provider value={{ widgetPosition, setWidgetPosition }}>
        <Header />
        <RouterProvider router={appRouter}>
          <Body />
        </RouterProvider>
      </MyContext.Provider>
  );
}

export default App;
