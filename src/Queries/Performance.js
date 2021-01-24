import gql from "graphql-tag";

import { EmployeeFragments } from "./EmployeeFragments";

export const PERFORMANCE_BY_EMPLOYEE = gql`
  query PerformanceByEmployee($eid: ID!) {
    performanceByEmployee(eid: $eid) {
      id
      title
      teamPlayer
      communication
      comment
      employee {
        ...EmployeeInfo
      }
      evaluator {
        ...EmployeeInfo
      }
      feedbacks {
        id
        name
        comment
      }
      createdAt
      updatedAt
    }
  }
  ${EmployeeFragments.employeeInfo}
`;

export const ALL_PERFORMANCES = gql`
  query AllPerformances {
    performances {
      id
      title
      employee {
        ...EmployeeInfo
      }
      evaluator {
        ...EmployeeInfo
      }
      feedbacks {
        id
        name
        comment
        createdAt
      }
      createdAt
    }
  }
  ${EmployeeFragments.employeeInfo}
`;

export const PERFORMANCE = gql`
  query Performance($id: ID!) {
    performance(id: $id) {
      id
      title
      teamPlayer
      communication
      comment
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
