import gql from "graphql-tag";

import { EmployeeFragments } from "./EmployeeFragments";

export const EMPLOYEES = gql`
  query Employees {
    employees {
      ...EmployeeInfo
      performances {
        id
        teamPlayer
        communication
        comment
        evaluator {
          ...EmployeeInfo
        }
      }
    }
  }
  ${EmployeeFragments.employeeInfo}
`;

export const EMPLOYEE_BY_ID = gql`
  query EmployeeById($id: ID!) {
    employee(id: $id) {
      ...EmployeeInfo
      performances {
        id
        teamPlayer
        communication
        comment
        evaluator {
          ...EmployeeInfo
        }
      }
    }
  }
  ${EmployeeFragments.employeeInfo}
`;
