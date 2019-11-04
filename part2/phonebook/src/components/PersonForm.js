import React from 'react';

const PersonForm = ({personHandler, nameHandler, numberHandler, nameRef, numberRef}) => {
  return (
    <form onSubmit={personHandler}>
    <div>
      name:{' '}
      <input
        ref={nameRef}
        placeholder='your name'
        onChange={nameHandler}
      />
    </div>
    <div>
      number:{' '}
      <input
        ref={numberRef}
        placeholder='your number'
        onChange={numberHandler}
      />
    </div>
    <div>
      <button type='submit'>add</button>
    </div>
  </form>
  )
}

export default PersonForm;