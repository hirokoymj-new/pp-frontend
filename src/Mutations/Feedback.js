import gql from "graphql-tag";

export const CREATE_FEEDBACK = gql`
  mutation CreateFeedback($input: createFeedbackInput!) {
    createFeedback(input: $input) {
      id
      name
      comment
      createdAt
      updatedAt
    }
  }
`;
