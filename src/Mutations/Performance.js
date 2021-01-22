import gql from "graphql-tag";

import { EmployeeFragments } from "Queries/EmployeeFragments";

export const CREATE_PERFORMANCE = gql`
  mutation CreatePerformance($input: createPerformanceInput!) {
    createPerformance(input: $input) {
      id
      teamPlayer
      communication
      comment
      createdAt
      updatedAt
      employee {
        ...EmployeeInfo
      }
      evaluator {
        ...EmployeeInfo
      }
    }
  }
  ${EmployeeFragments.employeeInfo}
`;

export const DELETE_PERFORMANCE = gql`
  mutation DeletePerformance($id: ID!) {
    deletePerformance(id: $id) {
      id
      teamPlayer
      communication
    }
  }
`;

export const UPDATE_PERFORMANCE = gql`
  mutation UpdatePerformance($id: ID!, $input: updatePerformanceInput!) {
    updatePerformance(id: $id, input: $input) {
      id
      teamPlayer
      communication
      comment
      createdAt
      updatedAt
    }
  }
`;
