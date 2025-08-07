import { gql } from '@apollo/client';

const DELETE_PRODUCT_QUERY = gql`
  mutation DeleteProduct ($id: String!) {
    deleteProduct(id: $id) {
        message
    }
}
`;

export default DELETE_PRODUCT_QUERY;