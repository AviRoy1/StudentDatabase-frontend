import React from 'react';
import { PacmanLoader } from 'react-spinners';

const PreLoader = () => {
  return (
    <>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <PacmanLoader color="#FFEEE1" />
      </div>
    </>
  );
};

export default PreLoader;
