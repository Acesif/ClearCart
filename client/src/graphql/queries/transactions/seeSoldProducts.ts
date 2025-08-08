import { gql } from '@apollo/client';

const SEE_SOLD_QUERY = gql`
  query SeeSold {
    seeSold {
      message
      data {
        product {
          id
          title
          description
          price
          productCategoryIds
        }
        fromOwnerId
        toOwnerId
        transactionType
      }
    }
  }
`;
export default SEE_SOLD_QUERY;