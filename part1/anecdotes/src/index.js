import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({ btnCap, handler }) => {
  return <button onClick={handler}>{btnCap}</button>;
};

const App = props => {
  const [selected, setSelected] = useState(
    Math.floor(Math.random() * anecdotes.length)
  );
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [mostVoted, setMostVoted] = useState(-1);

  const randomHandler = () => () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const voteHandler = () => () => {
    anecdotes[selected].votes++;
    let tmp = [...votes];
    tmp[selected]++;
    setVotes([...tmp]);
    sort();
  };

  const sort = () => {
    let max = 0;
    let voteIndex = 0;
    anecdotes.forEach((anecdote, index) => {
      if (anecdote.votes > max) {
        max = anecdote.votes;
        voteIndex = index;
      }
    });
    setMostVoted(voteIndex);
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected].text}</p>
      <p>has {anecdotes[selected].votes} votes</p>
      <Button btnCap={'vote'} handler={voteHandler()} />
      <Button btnCap={'next anecdote'} handler={randomHandler()} />
      {mostVoted !== -1 ? (
        <>
          <h1>Anecdote with most votes</h1>
          <p>{anecdotes[mostVoted].text}</p>
          <p>has {anecdotes[mostVoted].votes} votes</p>
        </>
      ) : null}
    </>
  );
};

const anecdotes = [
  { text: 'If it hurts, do it more often', votes: 0 },
  {
    text: 'Adding manpower to a late software project makes it later!',
    votes: 0,
  },
  {
    text:
      'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    votes: 0,
  },
  {
    text:
      'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    votes: 0,
  },
  { text: 'Premature optimization is the root of all evil.', votes: 0 },
  {
    text:
      'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    votes: 0,
  },
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
