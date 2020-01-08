import { gql } from 'apollo-boost';

export const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  id
  title
  author {
    name
  }
  published
  genres
}
`