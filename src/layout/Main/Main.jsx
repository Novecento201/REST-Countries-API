// rrd
import { Outlet, useLoaderData } from 'react-router-dom';

import Header from '../../components/Header/Header';

import './Main.css';

const Main = () => {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};
export default Main;
