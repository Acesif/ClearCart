import { gql } from '@apollo/client';

const GET_TRANSACTIONS_BY_PRODUCT_ID_QUERY = gql`
  query GetTransactionsByProductId($productId: String!) {
    getTransactionsByProductId(productId: $productId) {
      message
      data {
        id
        fromRentDate
        toRentDate
        transactionType
        toOwnerId
      }
    }
  }
`;

export default GET_TRANSACTIONS_BY_PRODUCT_ID_QUERY;
