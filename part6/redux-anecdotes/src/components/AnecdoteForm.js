import React from 'react';
import { addAnecdote, setNotification } from '../reducers/reducers';
import { connect } from 'react-redux';

const AnecdoteForm = props => {
  const newAnecdote = event => {
    event.preventDefault();
    let value = event.target.newAnecdote.value;
    event.target.newAnecdote.value = '';

    props.setNotification(`new note ${value} created`, 5);
    props.addAnecdote(value);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div>
          <input name='newAnecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  );
};

export default connect(null, {addAnecdote, setNotification})(AnecdoteForm);
