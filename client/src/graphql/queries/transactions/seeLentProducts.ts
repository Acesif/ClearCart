import { gql } from '@apollo/client';

const SEE_LENT_QUERY = gql`
  query SeeLent {
    seeLent {
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
export default SEE_LENT_QUERY;