import React from 'react';

const Filter = ({filterHandler}) => {
  return (
    <div>
      filter shown with:{' '}
      <input placeholder='find a person' onChange={filterHandler} />
    </div>
  );
};

export default Filter;
