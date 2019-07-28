import React from 'react';
import { Button } from 'reactstrap';

const LoadMoreButton = ({ onLoadMore }) => {
  return (
    <Button className='main-btn load-more-btn' onClick={() => onLoadMore()}>
      Load More
    </Button>
  );
};

export default LoadMoreButton;
