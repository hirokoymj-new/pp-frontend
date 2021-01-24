import { destroy } from "redux-form";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import get from "lodash/get";

import { UPDATE_PERFORMANCE } from "Mutations/Performance";
import { PERFORMANCE } from "Queries/Performance";
import { EMPLOYEES } from "Queries/Employee";

export const PerformanceEditFormController = ({
  children,
  performanceId,
  employeeId,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [updatePerformance] = useMutation(UPDATE_PERFORMANCE, {
    variables: { id: performanceId },
  });
  const { data, loading } = useQuery(EMPLOYEES);
  const { data: performanceData, loading: performanceLoading } = useQuery(
    PERFORMANCE,
    {
      variables: { id: performanceId },
    }
  );

  const performance =
    !performanceLoading && get(performanceData, "performance", {});

  const initialValues = !performanceLoading && {
    title: get(performance, "title"),
    evaluator: get(performance, "evaluator.id"),
    employee: get(performance, "employee.id"),
    teamPlayer: get(performance, "teamPlayer"),
    communication: get(performance, "communication"),
    comment: get(performance, "comment", ""),
  };

  const employees = !loading && get(data, "employees", []);
  const employee_options =
    !loading &&
    employees
      .map(({ id, firstName, lastName }) => {
        return {
          value: id,
          label: `${firstName} ${lastName}`,
        };
      })
      .sort((a, b) => (a.label < b.label ? -1 : 1));

  const onSubmit = async (values, dispatch) => {
    try {
      await updatePerformance({
        variables: {
          input: {
            ...values,
            employee: employeeId,
          },
        },
      });
      dispatch(destroy("Performance_Edit_Form"));
      enqueueSnackbar("Performance successfully updated!", {
        variant: "success",
      });
      history.push(`/review/${employeeId}`);
    } catch (e) {
      console.error(e);
      enqueueSnackbar("Failed to edit performance", {
        variant: "error",
      });
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.title) errors.title = "Required";
    if (!values.evaluator) errors.evaluator = "Required";
    if (!values.teamPlayer) errors.teamPlayer = "Required";
    if (!values.communication) errors.communication = "Required";
    return errors;
  };

  return children({
    onSubmit,
    validate,
    initialValues,
    employee_options,
    loading: loading || performanceLoading,
  });
};
