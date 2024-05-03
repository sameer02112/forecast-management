import './App.css';
import Header from './components/Header';
import DetailPage from './components/DetailPage';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { MainContainer, Body } from './components/Body';

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
  return (
    <div className="App">
      <Header/>
      <RouterProvider router = {appRouter}>
          <Body/>
        </RouterProvider>
    </div>
  );
}

export default App;
