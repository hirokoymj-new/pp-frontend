import { destroy } from "redux-form";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import get from "lodash/get";

import { CREATE_PERFORMANCE } from "Mutations/Performance";
import { PERFORMANCE_BY_EMPLOYEE } from "Queries/Performance";
import { EMPLOYEES } from "Queries/Employee";

export const PerformanceAddFormController = ({ children, employeeId }) => {
  console.log("PerformanceAddFormController", employeeId);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [createPerformance] = useMutation(CREATE_PERFORMANCE, {
    refetchQueries: [
      { query: PERFORMANCE_BY_EMPLOYEE, variables: { eid: employeeId } },
    ],
  });
  const { data, loading } = useQuery(EMPLOYEES);

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
      await createPerformance({
        variables: {
          input: {
            ...values,
            employee: employeeId,
          },
        },
      });
      dispatch(destroy("Performance_Add_Form"));
      enqueueSnackbar("Performance successfully created!", {
        variant: "success",
      });
      history.push(`/review/${employeeId}`);
    } catch (e) {
      console.error(e);
      enqueueSnackbar("Failed to create performance", {
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
    employee_options,
    loading,
  });
};
