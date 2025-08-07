import { gql } from '@apollo/client';

export const GET_CATEGORIES_QUERY = gql`
  query GetAllCategories {
    getAllCategories
  }
`;
export default GET_CATEGORIES_QUERY;