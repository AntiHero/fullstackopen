import React, { useState, useEffect } from 'react';
import Persons from './Persons';
import PersonForm from './PersonForm';
import Filter from './Filter';
import Notification from './Notification';
import contactService from '../services/contacts';

const App = () => {
  let nameRef = {},
    numberRef = {};

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const addNameHandler = e => {
    setNewName(e.target.value);
  };

  const addNumberHandler = e => {
    setNewNumber(e.target.value);
  };

  const filterHandler = e => {
    setFilter(e.target.value);
  };

  const deleteContact = id => {
    let confirm = window.confirm('Are you sure you want to delete a contact?');
    if (confirm)
      contactService.deleteContact(id).then(() => {
        return contactService.getAll().then(persons => setPersons(persons));
      });
  };

  useEffect(() => {
    contactService.getAll().then(persons => setPersons(persons));
  }, []);

  const addPersonHandler = e => {
    e.preventDefault();

    const phoneObject = {
      name: newName,
      number: newNumber,
    };

    isPresented(phoneObject);
  };

  const resetForm = () => {
    nameRef.value = '';
    numberRef.value = '';
    setNewName('');
    setNewNumber('');
  };

  const isPresented = phoneObject => {
    let presentedId = -1;
    let presentedPerson = {};
    let isPresented = persons.some(person => {
      if (person.name.toLowerCase() === newName.toLowerCase()) {
        presentedPerson = person;
        presentedId = person.id;
        return true;
      }
      return false;
    });

    if (isPresented) {
      let updateContact = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (updateContact) {
        contactService
          .update(presentedId, { ...presentedPerson, number: newNumber })
          .then(() => {
            resetForm();
            contactService.getAll().then(persons => setPersons(persons));
          })
          .then(() => {
            setNotification(`Contact ${presentedPerson.name} has been updated`);
            setTimeout(() => {
              setNotification(null);
            }, 3000);
            
          })
          .catch(() => {
            setErrorMessage(
              `Information of ${presentedPerson.name} has already been removed from server`
            );
            contactService.getAll().then(persons => setPersons(persons));
            setTimeout(() => {
              setErrorMessage(null);
            }, 3000);
            
          });
      }
    } else {
      contactService
        .create(phoneObject)
        .then(() => {
          resetForm();
          contactService.getAll().then(persons => setPersons(persons));
        })
        .then(() => {
          setNotification(`Contact ${phoneObject.name} has been created`);
          setTimeout(() => {
            setNotification(null);
          }, 3000);
        })
        .catch(() => {
          setErrorMessage(
            `Information of ${presentedPerson.name} has already been removed from server`
          );
          contactService.getAll().then(persons => setPersons(persons));
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterHandler={filterHandler} />
      <h2>Add a new</h2>
      <Notification message={notification} error={false} />
      <Notification message={errorMessage} error={true} />
      <PersonForm
        personHandler={addPersonHandler}
        nameHandler={addNameHandler}
        numberHandler={addNumberHandler}
        nameRef={ref => (nameRef = ref)}
        numberRef={ref => (numberRef = ref)}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
