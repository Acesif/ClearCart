import { gql } from '@apollo/client';

export const ADD_PRODUCT_MUTATION = gql`
  mutation AddProduct {
    addProduct(product: { isDraft: true }) {
      message
      data {
        id
      }
    }
  }
`;
