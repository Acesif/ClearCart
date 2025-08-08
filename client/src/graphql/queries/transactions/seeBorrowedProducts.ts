import { gql } from '@apollo/client';

const SEE_BORROWED_QUERY = gql`
  query SeeBorrowed {
    seeBorrowed {
      message
      data {
        product {
          id
          title
          description
          productCategoryIds
          rate
          interval
        }
        fromOwnerId
        toOwnerId
        transactionType
        fromRentDate
        toRentDate
      }
    }
  }
`;
export default SEE_BORROWED_QUERY;