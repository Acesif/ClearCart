import { gql } from '@apollo/client';

const SEE_BORROWED_QUERY = gql`
  query SeeBorrowed($page: Int!, $limit: Int!, $sortDirection: SortDirection!) {
    seeBorrowed(page: $page, limit: $limit, sortDirection: $sortDirection) {
        totalPages
        totalElements
        number
        size
        content {
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
export default SEE_BORROWED_QUERY;