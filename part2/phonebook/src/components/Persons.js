import React from 'react';

const Persons = ({ persons, filter, deleteContact }) => {
  return (
    <>
      {persons
        .filter(person => {
          if (filter === '') return person;
          return person.name.toLowerCase().search(filter.toLowerCase()) !== -1;
        })
        .map(person => (
          <p key={person.name}>
            {person.name} {person.number}{' '}
            <button onClick={() => deleteContact(person.id)}>delete</button>
          </p>
        ))}
    </>
  );
};

export default Persons;
