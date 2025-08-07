import { gql } from '@apollo/client';

export const GET_PRODUCT = gql`
  query GetProduct($id: String!) {
    getProduct(id: $id) {
      message
      data {
        id
        title
        description
        price
        productCategoryIds
        rate
        interval
      }
    }
  }
`;
