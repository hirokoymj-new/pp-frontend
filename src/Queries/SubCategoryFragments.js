import gql from "graphql-tag";

export const SubCategoryFragments = {
  subCategoryInfo: gql`
    fragment SubCategoryInfo on SubCategory {
      id
      name
      order
      createdAt
      updatedAt
    }
  `,
};
