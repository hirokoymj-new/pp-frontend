import { destroy } from "redux-form";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import get from "lodash/get";
import omitBy from "lodash/omitBy";
import isNil from "lodash/isNil";

import { CREATE_PERFORMANCE } from "Mutations/Performance";
import { PERFORMANCES } from "Queries/Performance";
import { EMPLOYEES } from "Queries/Employee";

export const PerformanceAddFormController = ({ children, employeeId }) => {
  console.log("PerformanceAddFormCongroller", employeeId);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [createPerformance] = useMutation(CREATE_PERFORMANCE, {
    refetchQueries: [{ query: PERFORMANCES, variables: { employeeId } }],
  });
  const { data, loading } = useQuery(EMPLOYEES);
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
      await createPerformance({
        variables: {
          input: {
            ...omitBy(data, isNil),
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

export const performance_title_options = [
  { value: "", label: "Empty" },
  { value: "2020 Anuual", label: "2020 Anuual" },
  { value: "2020 Semi-Anuual", label: "2020 Semi-Anuual" },
  { value: "2019 Anuual", label: "2020 Anuual" },
  { value: "2019 Semi-Anuual", label: "2020 Semi-Anuual" },
  { value: "2018 Anuual", label: "2020 Anuual" },
];

export const score_options = [
  { value: "excellent", label: "Excellent" },
  { value: "good", label: "Good" },
  { value: "bad", label: "Bad" },
];
