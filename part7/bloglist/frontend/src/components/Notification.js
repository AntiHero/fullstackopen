import React from 'react';
import { connect } from 'react-redux';

const Notification = (props) => {
  const { notification } = props;
  if (!notification) {
    return null;
  }

  return <div className='notification'>{notification}</div>;
};

const mapStateToProps = state => {
  return {
    notification: state.notification.text
  }
}

export default connect(mapStateToProps)(Notification);