import React from 'react';
import { connect } from 'react-redux';


const Notification = props => {
  const message = props.message;
  
  let styleOff = { display: 'none' };

  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  style = message ? style : styleOff;

  return <div style={style}>{message}</div>;
};

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}

export default connect(mapStateToProps)(Notification);
