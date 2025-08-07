import { gql } from '@apollo/client';

export const GET_PRODUCTS_BY_CATEGORY_QUERY = gql`
  query GetByCategory(
    $page: Int!
    $limit: Int!
    $sortDirection: SortDirection!
    $categoryCode: CategoryCode!
  ) {
    getByCategory(
      page: $page
      limit: $limit
      categoryCode: $categoryCode
      sortDirection: $sortDirection
    ) {
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
