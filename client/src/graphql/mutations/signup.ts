import { gql } from '@apollo/client';

export const SIGNUP_MUTATION = gql`
  mutation SignUp($email: String!, $password: String!, $username: String!) {
    signUp(signupInput: { email: $email, password: $password, username: $username }) {
      message
      data {
        username
      }
    }
  }
`;
