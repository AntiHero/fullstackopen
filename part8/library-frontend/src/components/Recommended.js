import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ME } from '../queries/userQueries';
import { ALL_BOOKS } from '../queries/bookQueries';

const Recommended = props => {
  const [genre, setGenre] = useState('');
  const [books, setBooks] = useState('');

  const booksByGenre = useQuery(ALL_BOOKS, {
    variables: { genre },
  });

  const user = useQuery(ME);

  useEffect(() => {
    if (!user.loading) {
      setGenre(user.data.me.favoriteGenre);
    }

    if (!booksByGenre.loading) {
      setBooks(booksByGenre.data.allBooks)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.loading, booksByGenre.loading, booksByGenre.data]);

  if (!props.show) {
    return null;
  }

  if (booksByGenre.loading) return <h4>Loading...</h4>;
  if (booksByGenre.error) return <p>ERROR</p>;

  return (
    <div>
      <h2>Recommendations</h2>
      books in your favorite genre
      {books.length ? (
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
      ) : (
        <div>
          <br />
          no books
        </div>
      )}
    </div>
  );
};

export default Recommended;
