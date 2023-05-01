import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Main from './layout/Main/Main';

import Error from './pages/Error/Error';
import DetailPage from './pages/DetailPage/DetailPage';
import Home from './pages/Home/Home';

import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/detail/:id',
        element: <DetailPage />,
      },
      {
        path: '/*',
        element: <Error />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
