import React, { useState } from 'react';
import {
  useMutation,
  useQuery,
  useApolloClient,
  useSubscription,
} from '@apollo/react-hooks';
import { ADD_BOOK } from '../mutations/bookMutations';
import { ALL_BOOKS } from '../queries/bookQueries';
import { ALL_AUTHORS } from '../queries/authorQueries';
import { BOOK_ADDED } from '../subscriptions/bookSubscriptions';
import { ME } from '../queries/userQueries';

const NewBook = props => {
  const [title, setTitle] = useState('');
  const [author, setAuhtor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const user = useQuery(ME);
  const client = useApolloClient();

  const handleError = e => {
    console.log(e);
  };

  const updateCacheWith = addedBook => {
    const includedIn = (set, object) => {
      return set.map(b => b.id).includes(object.id);
    };
    try {
      const books = client.readQuery({ query: ALL_BOOKS });
      
      if (!includedIn(books.allBooks, addedBook)) {

        books.allBooks.push(addedBook);

        client.writeQuery({
          query: ALL_BOOKS,
          data: books,
        });
      }

      client.writeQuery({
        query: ALL_BOOKS,
        variables: { genre },
        data: books,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      alert(`Book ${addedBook.title} added`);
      updateCacheWith(addedBook);
    },
  });

  const [
    addBook,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(ADD_BOOK, {
    onError: handleError,
    update: (store, response) => {
      //console.log(response)
      updateCacheWith(response.data.addBook);
    },
        refetchQueries: [
      {
        query: ALL_BOOKS,
        variables: { genre: !user.loading && user.data.me.favoriteGenre },
      },
      { query: ALL_AUTHORS },  
    ],
  });

  if (!props.show) {
    return null;
  }

  const submit = async e => {
    e.preventDefault();

    await addBook({
      variables: { title, author, published, genres },
    });

    setTitle('');
    setPublished('');
    setAuhtor('');
    setGenres([]);
    setGenre('');
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type='button'>
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type='submit'>create book</button>
      </form>
      {mutationLoading && <p>Loading...</p>}
      {mutationError && <p>Error :( Please try again</p>}
    </div>
  );
};

export default NewBook;
