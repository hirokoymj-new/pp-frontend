import { destroy } from "redux-form";
import { useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

import { CREATE_FEEDBACK } from "Mutations/Feedback";
import { ALL_PERFORMANCES } from "Queries/Performance";

export const FeedbackAddFormController = ({ children, performanceId }) => {
  console.log("FeedbackAddFormController", performanceId);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [createFeedback] = useMutation(CREATE_FEEDBACK, {
    refetchQueries: [{ query: ALL_PERFORMANCES }],
  });

  const onSubmit = async (values, dispatch) => {
    try {
      const data = {
        ...values,
        performance: performanceId,
      };
      await createFeedback({
        variables: {
          input: {
            ...data,
          },
        },
      });
      dispatch(destroy("Feedback_Add_Form"));
      enqueueSnackbar("Feedback successfully created!", {
        variant: "success",
      });
      history.push("/performanceList");
    } catch (e) {
      console.error(e);
      enqueueSnackbar("Failed to post feedback", {
        variant: "error",
      });
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) errors.name = "Required";
    if (!values.comment) errors.comment = "Required";
    return errors;
  };

  return children({
    onSubmit,
    validate,
  });
};
