import anecdoteService from '../services/anecdotes';

let timer = 0;

export const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE': {
      const id = action.data.id;
      const anecdoteToChange = state.find(a => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    }
    case 'NEW_ANECDOTE': {
      return state.concat(action.data);
    }
    case 'INIT_DATA':
      return action.data;
    default:
      return state;
  }
};

const initialMessage = '';

export const notificationReducer = (state = initialMessage, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.data;
    default:
      return state;
  }
};

const initialFilter = '';

export const filterReducer = (state = initialFilter, action) => {
  switch (action.type) {
    case 'FILTER':
      return action.data;
    default:
      return state;
  }
};

export const newFilter = filter => {
  return {
    type: 'FILTER',
    data: filter,
  };
};

export const addVote = id => {
  return async dispatch => {
    await anecdoteService.vote(id);

    dispatch({
      type: 'VOTE',
      data: { id },
    });
  };
};

export const addAnecdote = data => {
  return async dispatch => {
    const anecdote = await anecdoteService.create(data);

    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdote,
    });
  };
};

export const initData = () => {
  return async dispatch => {
    const data = await anecdoteService.getAll();

    dispatch({
      type: 'INIT_DATA',
      data,
    });
  };
};

const timeout = sec => {
  return new Promise(resolve => timer = setTimeout(resolve, sec));
};

export const setNotification = (text, time) => {
  return async dispatch => {
    clearTimeout(timer)
    dispatch({
      type: 'SET_MESSAGE',
      data: text,
    });

    await timeout(1000*time);

    dispatch({
      type: 'SET_MESSAGE',
      data: '',
    });
  };
};
