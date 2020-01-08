import { gql } from 'apollo-boost';
import { BOOK_DETAILS } from '../fragments/bookFragment';

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`;
