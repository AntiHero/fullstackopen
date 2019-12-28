import React from 'react';
import { addVote, setNotification } from '../reducers/reducers';
import { connect } from 'react-redux';

const AnecdoteList = props => {
  const handleVote = (id, text) => {
    props.addVote(id);
    props.setNotification(`you voted ${text}`, 5);
  };

  return (
    <>
      {props.anecdotesToShow
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote.id, anecdote.content)}>
                vote
              </button>
            </div>
          </div>
        ))}
    </>
  );
};

const anecdotesToShow = ({ anecdotes, filter }) => {
  return !filter
    ? anecdotes
    : anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      );
};

const mapStateToProps = state => {
  return {
    anecdotesToShow: anecdotesToShow(state),
  };
};

export default connect(mapStateToProps, { addVote, setNotification })(AnecdoteList);
