import { gql } from '@apollo/client';

const SEE_BOUGHT_QUERY = gql`
  query SeeBought($page: Int!, $limit: Int!, $sortDirection: SortDirection!) {
    seeBought(page: $page, limit: $limit, sortDirection: $sortDirection) {
        totalPages
        totalElements
        number
        size
        content {
            fromOwnerId
            toOwnerId
            transactionType
            fromRentDate
            toRentDate
            product {
                title
                id
                description
                productCategoryIds
                price
                rate
                interval
            }
        }
    }
}
`;
export default SEE_BOUGHT_QUERY;