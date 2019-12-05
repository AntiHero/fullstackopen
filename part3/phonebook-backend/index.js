const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-54321',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
];

morgan.token('post-data', function(req, res) {
  return req.method === 'POST' ? JSON.stringify(req.body) : new String('');
});

app.use(
  bodyParser.json(),
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :post-data'
  )
);
app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/info', (req, res) => {
  let personsCount = persons.length;
  let date = new Date();
  let utc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
  res.send(`<p>Phonebook has info for ${personsCount} people</p>
  <p>${new Date(utc)}</>`);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);
  persons = persons.filter(person => person.id !== id);
  console.log(persons);

  if (person) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

const generateId = () => {
  return Math.floor(Math.random() * 9999999);
};

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({
      error: 'name missing',
    });
  }

  if (!body.number) {
    return res.status(400).json({
      error: 'number missing',
    });
  }

  if (
    persons.find(
      person => String(body.name).toLowerCase() === person.name.toLowerCase()
    )
  ) {
    return res.status(409).json({ error: 'name must be unique' });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
