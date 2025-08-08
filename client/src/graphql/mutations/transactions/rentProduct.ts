import { gql } from '@apollo/client';

const RENT_PRODUCT_MUTATION = gql`
  mutation RentProduct($id: String!, $fromRentDate: String!, $toRentDate: String!) {
    rentProduct(
      product: { id: $id }
      fromRentDate: $fromRentDate
      toRentDate: $toRentDate
    ) {
      message
      data {
        product {
          id
          title
          description
          rate
          interval
        }
        fromOwnerId
        toOwnerId
        transactionType
        toRentDate
        fromRentDate
      }
    }
  }
`;
export default RENT_PRODUCT_MUTATION;
