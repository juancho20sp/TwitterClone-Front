import React from 'react';
import './Loader.css';

// Components
import BounceLoader from 'react-spinners/BounceLoader';

const Loader = () => {
  return (
    <div className='loader-container'>
      <BounceLoader color={'#1D98F0'} size={150} />
    </div>
  );
};

export default Loader;
