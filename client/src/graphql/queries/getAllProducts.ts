import { gql } from '@apollo/client';

export const GET_ALL_PRODUCTS_QUERY = gql`
  query GetAllProducts($page: Int!, $limit: Int!, $sortDirection: SortDirection!) {
    getAllProducts(page: $page, limit: $limit, sortDirection: $sortDirection) {
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
      }
    }
  }
`;
