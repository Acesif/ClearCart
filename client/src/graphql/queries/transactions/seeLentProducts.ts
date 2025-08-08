import { gql } from '@apollo/client';

const SEE_LENT_QUERY = gql`
  query SeeLent($page: Int!, $limit: Int!, $sortDirection: SortDirection!) {
    seeLent(page: $page, limit: $limit, sortDirection: $sortDirection) {
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
export default SEE_LENT_QUERY;
