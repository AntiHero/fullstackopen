import React from 'react';

const Notification = ({ message, error }) => {
  const notificationStyle = !error ? {
    color: 'green',
    backgroundColor: 'lightgrey',
    padding: '10px',
    marginBottom: '20px',
    border: '2px solid green',
    borderRadius: '3px',
    maxWidth: '500px',
    fontSize: 16
  } : {
    color: 'red',
    backgroundColor: 'lightgrey',
    padding: '10px',
    marginBottom: '20px',
    border: '2px solid red',
    borderRadius: '3px',
    maxWidth: '500px',
    fontSize: 16
  }

  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification;