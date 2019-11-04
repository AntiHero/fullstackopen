import React from 'react';

const Country = ({info}) => {
  return (
    <>
      <h1>{info.name}</h1>
      <div>
        capital {info.capital}
        <br />
        population {info.population}
      </div>

      <div>
        <br />
        <b>languages</b>
        <ul>
          {info.languages.map(language => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img className='flag' src={info.flag} alt='flag' />
      </div>
    </>
  );
};

export default Country;
