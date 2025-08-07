import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
  mutation SignUp(
    $firstName: String!
    $lastName: String!
    $address: String!
    $phoneNumber: String!
    $email: String!
    $password: String!
  ) {
    signUp(
      signupInput: {
        firstName: $firstName
        lastName: $lastName
        address: $address
        phoneNumber: $phoneNumber
        email: $email
        password: $password
      }
    ) {
      message
      data {
        id
        email
        fullName
      }
    }
  }
`;
