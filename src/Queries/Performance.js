import gql from "graphql-tag";

import { EmployeeFragments } from "./EmployeeFragments";

export const PERFORMANCES = gql`
  query Performances {
    performances {
      id
      teamPlayer
      communication
      comment
      employee {
        ...employeeInfo
      }
      evaluator {
        ...employeeInfo
      }
    }
  }
  ${EmployeeFragments.employeeInfo}
`;

export const PERFORMANCE = gql`
  query Performance(id: ID!) {
    performances {
      id
      teamPlayer
      communication
      comment
      employee {
        ...employeeInfo
      }
      evaluator {
        ...employeeInfo
      }
    }
  }
  ${EmployeeFragments.employeeInfo}
`;
