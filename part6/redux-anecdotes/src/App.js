import React, { useEffect } from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notificaton from './components/Notification';
import Filter from './components/Filter';
import { initData } from './reducers/reducers';
import { connect } from 'react-redux';

const App = props => {
  useEffect(() => {
    props.initData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notificaton />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default connect(null, { initData })(App);
