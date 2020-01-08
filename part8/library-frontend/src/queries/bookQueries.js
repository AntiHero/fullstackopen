import { gql } from 'apollo-boost';
import { BOOK_DETAILS } from '../fragments/bookFragment';

export const ALL_BOOKS = gql`
  query AllBooks(
    $author: String
    $genre: String
  ) {
    allBooks(
      author: $author
      genre: $genre
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;
