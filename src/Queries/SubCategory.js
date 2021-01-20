import gql from "graphql-tag";

import { CategoryFragments } from "./CategoryFragments";

export const SUB_CATEGORIES = gql`
  query SubCategories($limit: Int, $cursor: String) {
    subCategories(limit: $limit, cursor: $cursor) {
      subCategoryFeed {
        id
        name
        order
        createdAt
        updatedAt
        category {
          ...CategoryInfo
        }
      }
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${CategoryFragments.categoryInfo}
`;

export const SUB_CATEGORY_BY_ID = gql`
  query SubCategoryById($id: ID!) {
    subCategoryById(id: $id) {
      id
      name
      order
      createdAt
      updatedAt
      category {
        ...CategoryInfo
      }
    }
  }
  ${CategoryFragments.categoryInfo}
`;

export const SUB_CATEGORY_BY_CATEGORY = gql`
  query SubCategoryByCategory($categoryId: ID!) {
    subCategoryByCategory(categoryId: $categoryId) {
      id
      name
      order
      createdAt
      updatedAt
      category {
        ...CategoryInfo
      }
    }
  }
  ${CategoryFragments.categoryInfo}
`;
