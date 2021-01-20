import gql from "graphql-tag";

import { EmployeeFragments } from "Queries/EmployeeFragments";

export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($input: createEmployeeInput!) {
    createEmployee(input: $input) {
      ...EmployeeInfo
    }
  }
  ${EmployeeFragments.employeeInfo}
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
      ...EmployeeInfo
    }
  }
  ${EmployeeFragments.employeeInfo}
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $input: updateEmployeeInput!) {
    updateEmployee(id: $id, input: $input) {
      ...EmployeeInfo
    }
  }
  ${EmployeeFragments.employeeInfo}
`;
