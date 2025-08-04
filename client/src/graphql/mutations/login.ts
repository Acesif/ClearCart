import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(loginInput: { username: $username, password: $password }) {
      message
      data {
        accessToken
        expiresInSeconds
      }
    }
  }
`;
