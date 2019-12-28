import axios from 'axios';

const baseURL = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const create = async content => {
  const anecdote = {
    content,
    votes: 0,
  };
  const response = await axios.post(baseURL, anecdote);
  return response.data;
};

const vote = async id => {
  const anecdotes = await axios.get(baseURL);
  const anecdoteToVote = anecdotes.data.find(
    anecdote => anecdote.id === id
  );
  const newAnecdote = {
    ...anecdoteToVote,
    votes: anecdoteToVote.votes + 1,
  };
  const response = await axios.put(baseURL + `/${id}`, newAnecdote);
  return response.data;
};

export default { getAll, create, vote };
