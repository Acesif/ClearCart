import { gql } from '@apollo/client';

const BUY_PRODUCT_MUTATION = gql`
  mutation BuyProduct($id: String!) {
    buyProduct(product: { id: $id }) {
      message
      data {
        fromOwnerId
        transactionType
        product {
          id
          title
          description
          price
        }
      }
    }
  }
`;
export default BUY_PRODUCT_MUTATION;