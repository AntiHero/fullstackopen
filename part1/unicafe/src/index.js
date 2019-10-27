import './index.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ btncap, handleClick }) => (
  <button onClick={handleClick}>{btncap}</button>
);

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = btnCap => {
    switch (btnCap) {
      case 'good':
        return () => setGood(good + 1);
      case 'neutral':
        return () => setNeutral(neutral + 1);
      case 'bad':
        return () => setBad(bad + 1);
      default:
        return () => {};
    }
  };

  return (
    <div>
      <h2>give feedback</h2>
      <Button btncap='good' handleClick={handleClick('good')} />
      <Button btncap='neutral' handleClick={handleClick('neutral')} />
      <Button btncap='bad' handleClick={handleClick('bad')} />
      <h2>statistics</h2>
      {good + bad + neutral > 0 ? (
        <table>
          <tbody>
            <Statistic text={'good'} value={good} />
            <Statistic text={'neutral'} value={neutral} />
            <Statistic text={'bad'} value={bad} />
            <Statistic text={'all'} value={good + neutral + bad} />
            <Statistic
              text={'average'}
              value={
                good + neutral + bad === 0
                  ? '-'
                  : (good - bad) / (good + bad + neutral)
              }
            />
            <Statistic
              text={'positive'}
              value={good ? `${(100 * good) / (good + neutral + bad)} %` : '-'}
            />
          </tbody>
        </table>
      ) : (
        <p>
          <b>No feedback given</b>
        </p>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
