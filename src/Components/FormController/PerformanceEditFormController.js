import { destroy } from "redux-form";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import get from "lodash/get";
import omitBy from "lodash/omitBy";
import isNil from "lodash/isNil";

import { UPDATE_PERFORMANCE } from "Mutations/Performance";
import { PERFORMANCE, PERFORMANCES } from "Queries/Performance";
import { EMPLOYEES } from "Queries/Employee";

export const PerformanceEditFormController = ({
  children,
  performanceId,
  employeeId,
}) => {
  console.log("PerformanceEditFormCongroller", performanceId);
  console.log("employeeId", employeeId);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  // const [updatePerformance] = useMutation(UPDATE_PERFORMANCE, {
  //   variables: { id: performanceId },
  //   refetchQueries: [
  //     {
  //       query: PERFORMANCES,
  //       variables: { id: employeeId },
  //       fetchPolicy: "cache-only",
  //     },
  //   ],
  // });

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

  if (!performanceLoading) console.log(performanceData);
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

  if (!loading) console.log(data);
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
      const data = {
        title: get(values, "title"),
        evaluator: get(values, "evaluator"),
        teamPlayer: get(values, "teamPlayer"),
        communication: get(values, "communication"),
        comment: get(values, "comment"),
        employee: employeeId,
      };
      await updatePerformance({
        variables: {
          input: {
            ...omitBy(data, isNil),
          },
        },
      });
      dispatch(destroy("Performance_Edit_Form"));
      enqueueSnackbar("Performance successfully updated!", {
        variant: "success",
      });
      history.push({
        pathname: "/review",
        state: { employeeId },
      });
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
