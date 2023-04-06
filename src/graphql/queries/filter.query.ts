import { gql } from 'apollo-boost';
import { filterFields } from './fields';

export const defaultFiltersQuery = gql`
  query DefaultFilters {
    defaultFilters {
      id
      name
      displayName
      type
      values
      categoryId
      isDefault
      createdAt
      updatedAt
    }
  }
`;

export const filtersByCategoryQuery = gql`
    query ($categoryId: Number!) {
      filtersByCategory(categoryId: $categoryId) {
        ${filterFields}
      }
    }
`;
