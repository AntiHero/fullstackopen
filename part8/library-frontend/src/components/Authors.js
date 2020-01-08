import React, { useState, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ALL_AUTHORS } from '../queries/authorQueries';
import { EDIT_AUTHOR } from '../mutations/authorMutation';

const Authors = props => {
  const [birthDate, setBirthDate] = useState('');
  const { data, loading, error } = useQuery(ALL_AUTHORS);
  const selectRef = useRef();

  const handleError = e => {
    console.log(e);
  };

  const [
    editAuthor,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(EDIT_AUTHOR, {
    onError: handleError,
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async e => {
    e.preventDefault();
    
    let setBornTo = birthDate;
    let name = selectRef.current.options[selectRef.current.selectedIndex].value;

    await editAuthor({
      variables: { name, setBornTo },
    });

    setBirthDate('');
  };

  if (loading) return <h4>Loading...</h4>;
  if (error) return <p>ERROR</p>;

  if (!props.show) {
    return null;
  }
  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set Birthyear</h2>
      <form>
        <select ref={selectRef}>
          {data.allAuthors.map((author, index) => (
            <option value={author.name} key={'author' + index}>{author.name}</option>
          ))}
        </select>
        <div>
          born
          <input
            type='text'
            value={birthDate}
            onChange={({ target }) => setBirthDate(Number(target.value))}
          />
        </div>

        <button type='submit' onClick={submit}>
          Update
        </button>
      </form>
      {mutationLoading && <p>Loading...</p>}
      {mutationError && <p>Error :( Please try again</p>}
    </div>
  );
};

export default Authors;
