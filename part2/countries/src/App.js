import React, { useState, useEffect } from 'react';
import Country from './components/Country';
import Weather from './components/Weather';
import axios from 'axios';

function App() {
  const maxShowNum = 10;

  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [weatherData, setWeatherData] = useState(0);
  const [countryToShow, setCountryToShow] = useState('');


  const filterHandler = e => {
    setFilter(e.target.value);
    setCountryToShow('');
  };

  const showCountry = e => {
    setCountryToShow(e.target.getAttribute('data-index'));
  };

  const showCountries = () => {
    switch (true) {
      case countries.length === 1 && weatherData !== 0:
        return (
          <>
            <Country info={countries[0]} />
            <Weather info={countries[0]} weather={weatherData} />
          </>
        );
      case countries.length === 0: return <p>not found</p>
      case countries.length > 10:
        return <p>Too many matches, specify another filter</p>;
      default:
        return (
          <>
            {countries.map((country, index) => {
              return (
                <div key={country.name}>
                  <p className='country'>{country.name}</p>
                  <button data-index={index} onClick={showCountry}>
                    show
                  </button>
                </div>
              );
            })}
            {countryToShow.length && weatherData !== 0 ? (
              <>
                <Country info={countries[countryToShow]} />
                <Weather
                  info={countries[countryToShow]}
                  weather={weatherData}
                />
              </>
            ) : null}
          </>
        );
    }
  };

  const fetchCountryData = () => {
    let flag = false;

    if (filter !== '') {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${filter}`)
      .then(res => {
        flag = true;
        if (res.data.length > maxShowNum) {
          setCountries(new Array(maxShowNum + 1));
        } else {
          setCountries(res.data);
        }

        if (res.data.length === 1) {
          return axios.get(
            `http://api.weatherstack.com/current?access_key=2c34da6a50eb9ccbe32845b4a5047cc0&query=${res.data[0].capital}`
          );
        }

        return 0;
      })
      .then(res => {
        if (res) setWeatherData(res.data.current);

        if (countryToShow.length !== 0) {
          return axios.get(
            `http://api.weatherstack.com/current?access_key=2c34da6a50eb9ccbe32845b4a5047cc0&query=${countries[countryToShow].capital}`
          );
        }

        return 0;
      })
      .then(res => {
        if (res) setWeatherData(res.data.current);
      })
      .catch(err => {
        if (!flag) setCountries([]);
        console.log(err)
      });
    } 
  };

  useEffect(fetchCountryData, [filter, countryToShow]);

  return (
    <>
      find countries{' '}
      <input placeholder='country name' onChange={filterHandler} />
      {filter.length !== 0 ? showCountries() : null}
    </>
  );
}

export default App;
