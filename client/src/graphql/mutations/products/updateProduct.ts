import { gql } from '@apollo/client';

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProduct(
    $id: String!
    $title: String
    $description: String
    $price: Float
    $productCategoryIds: [String]
    $rate: Float
    $interval: RateInterval
    $isDraft: Boolean
  ) {
    updateProduct(
      product: {
        id: $id
        title: $title
        description: $description
        price: $price
        productCategoryIds: $productCategoryIds
        rate: $rate
        interval: $interval
        isDraft: $isDraft
      }
    ) {
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

export default UPDATE_PRODUCT_MUTATION;