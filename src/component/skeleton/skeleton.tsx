import React from 'react';
import './skeleton.css';

const Skeleton: React.FC = () => {
  return (
    <div className='skeleton'>
      <div className='skeleton-image'>Loading...</div>
    </div>
  );
};

export default Skeleton;
