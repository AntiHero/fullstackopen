import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useField = type => {
  const [value, setValue] = useState('');

  const onChange = event => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useResource = baseUrl => {
  const [resources, setResources] = useState([]);

  let token = null;

  const setToken = newToken => {
    token = `bearer ${newToken}`;
  };

  const getAll = async () => {
    const response = await axios.get(baseUrl);
    await setResources(response.data);
    return response.data;
  };

  const create = async resource => {
    const config = {
      headers: { Authorization: token },
    };

    const response = await axios.post(baseUrl, resource, config);
    return response.data;
  };

  const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl} /${id}`, newObject);
    return response.data
  };

  const service = {
    create,
    getAll,
    setToken,
    update,
  };

  return [resources, service];
};

const App = () => {
  const content = useField('text');
  const name = useField('text');
  const number = useField('text');

  const [notes, noteService] = useResource('http://localhost:3005/notes');
  const [persons, personService] = useResource('http://localhost:3005/persons');

  const handleNoteSubmit = async event => {
    event.preventDefault();
    await noteService.create({ content: content.value });
    await noteService.getAll();
  };

  const handlePersonSubmit = async event => {
    event.preventDefault();
    await personService.create({ name: name.value, number: number.value });
    await personService.getAll();
  };

  useEffect(() => {
    noteService.getAll();
    personService.getAll();
  }, []);

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;
