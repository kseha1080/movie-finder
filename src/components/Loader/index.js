import React from 'react';
import { Spinner } from 'reactstrap';

const Loader = () => {
  return (
    <div className='loader-wrapper'>
      <Spinner color='danger' />
    </div>
  );
};

export default Loader;
