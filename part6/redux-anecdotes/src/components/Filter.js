import React from 'react';
import { newFilter } from '../reducers/reducers';
import { connect } from 'react-redux';

const Filter = props => {
  const handleChange = event => {
    const text = event.target.value;
    props.filter(text);
  };
  
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    filter: text => {
      dispatch(newFilter(text));
    }
  }
}

export default connect(null, mapDispatchToProps)(Filter);
