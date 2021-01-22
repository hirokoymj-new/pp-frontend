import gql from "graphql-tag";

import { EmployeeFragments } from "./EmployeeFragments";

export const PERFORMANCES = gql`
  query Performances($employeeId: ID) {
    performances(employeeId: $employeeId) {
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
      createdAt
      updatedAt
    }
  }
  ${EmployeeFragments.employeeInfo}
`;

// export const PERFORMANCE = gql`
//   query Performance(id: ID!) {
//     performances {
//       id
//       title
//       teamPlayer
//       communication
//       comment
//       employee {
//         ...EmployeeInfo
//       }
//       evaluator {
//         ...EmployeeInfo
//       }
//     }
//   }
//   ${EmployeeFragments.employeeInfo}
// `;
