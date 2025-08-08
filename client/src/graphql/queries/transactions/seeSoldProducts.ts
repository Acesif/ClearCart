import { gql } from '@apollo/client';

const SEE_SOLD_QUERY = gql`
  query SeeSold($page: Int!, $limit: Int!, $sortDirection: SortDirection!) {
    seeSold(page: $page, limit: $limit, sortDirection: $sortDirection) {
        totalPages
        totalElements
        number
        size
        content {
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
            fromRentDate
            toRentDate
        }
    }
}
`;
export default SEE_SOLD_QUERY;
