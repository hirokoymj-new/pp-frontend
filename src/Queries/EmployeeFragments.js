import gql from "graphql-tag";

export const EmployeeFragments = {
  employeeInfo: gql`
    fragment EmployeeInfo on Employee {
      id
      firstName
      lastName
      email
      createdAt
      updatedAt
    }
  `,
};
