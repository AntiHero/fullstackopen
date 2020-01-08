import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ALL_BOOKS } from '../queries/bookQueries';

const Books = props => {
  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState('');

  const booksByGenre = useQuery(ALL_BOOKS, {
    variables: { genre },
  });
  const updateGenres = useQuery(ALL_BOOKS);

  useEffect(() => {
    if (!booksByGenre.loading) {
      setBooks(booksByGenre.data.allBooks);
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booksByGenre.loading, booksByGenre.data]);

  const selectGenre = genre => {
    if (genre === 'all genres') {
      setGenre('');
    } else {
      setGenre(genre);
    }
  };

  if (!props.show) {
    return null;
  }

  if (booksByGenre.loading && updateGenres.loading) return <h4>Loading...</h4>;
  if (booksByGenre.error && updateGenres.error) return <p>ERROR</p>;

  return (
    <div>
      <h2>Books</h2>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(b => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      { [
            ...new Set(
              updateGenres.data.allBooks
                .map(book => book.genres)
                .reduce((acc, current) => {
                  return acc.concat(current);
                })
            ),
          ].concat('all genres').map((button, index) => (
        <button key={index + 'button'} onClick={() => selectGenre(button)}>
          {button}
        </button>
      ))}
    </div>
  );
};

export default Books;
