import { gql } from '@apollo/client';

export const GET_ALL_MY_PRODUCTS_QUERY = gql`
  query GetAllProductsByUser($page: Int!, $limit: Int!, $sortDirection: SortDirection!) {
    getAllProductsByUser(page: $page, limit: $limit, sortDirection: $sortDirection) {
      totalPages
      totalElements
      number
      size
      content {
        id
        title
        description
        price
        productCategoryIds
        rate
        interval
        owner
      }
    }
  }
`;
