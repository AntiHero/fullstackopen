import { gql } from 'apollo-boost';

export const EDIT_AUTHOR = gql`
  mutation editBirthDate($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;
