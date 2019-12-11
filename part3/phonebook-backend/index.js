const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./src/model/person');

morgan.token('post-data', function(req, res) {
  return req.method === 'POST' ? JSON.stringify(req.body) : new String('');
});

app.use(
  express.static('build'),
  bodyParser.json(),
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :post-data'
  ),
  cors()
);

app.get('/api/persons', (req, res) => {
  Person.find({}).then(people => {
    res.json(people);
  });
});

app.get('/info', (req, res) => {
  let date = new Date();
  let utc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );

  Person.find({}).then(result =>
    res.send(`<p>Phonebook has info for ${result.length} people</p>
  <p>${new Date(utc)}</>`)
  );
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person);
      } else {
        let error = new Error('Not Found!');
        error.name = 'NotFound';
        throw error;
      }
    })
    .catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(person => {
      if (person) {
        res.status(204).end();
      } else {
        let error = new Error('Not Found!');
        error.name = 'NotFound';
        throw error;
      }
    })
    .catch(error => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  const person = {
    name: req.body.name,
    number: req.body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatePerson => {
      res.json(updatePerson.toJSON());
    })
    .catch(error => next(error));
});

app.post('/api/persons', (req, res, next) => {
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

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then(savedPerson => {
    res.json(savedPerson.toJSON());
  }).catch(error => next(error)); 
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.log(error.message);
  console.log(error.name, 'name')

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'NotFound') {
    return response.status(404).send({ error: 'not found' });
  }  else if (error.name === 'MongoError' || error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
