import React from 'react';
import './Home.css';
import { Sidebar, Widgets, Feed } from '../../components';

const Home = () => {
  return (
    <div className='home'>
      <Sidebar />

      {/* <Feed /> */}

      {/* // $ */}
      {/* AQUÍ HAY UN PROBLEMA DE REFERENCIAS */}
      {/* <Widgets /> */}
    </div>
  );
};

export default Home;
