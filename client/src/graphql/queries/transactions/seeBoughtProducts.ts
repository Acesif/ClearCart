import { gql } from '@apollo/client';

const SEE_BOUGHT_QUERY = gql`
  query SeeBought {
    seeBought {
      message
      data {
        product {
          id
          title
          description
          price
          productCategoryIds
          rate
          interval
        }
        fromOwnerId
        toOwnerId
        transactionType
      }
    }
  }
`;
export default SEE_BOUGHT_QUERY;