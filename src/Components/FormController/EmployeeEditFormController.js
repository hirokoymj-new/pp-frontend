import { destroy } from "redux-form";
import { useQuery, useMutation } from "@apollo/react-hooks";
import get from "lodash/get";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

import { UPDATE_EMPLOYEE } from "Mutations/Employee";
import { EMPLOYEES, EMPLOYEE_BY_ID } from "Queries/Employee";

export const EmployeeEditFormController = ({ children, employeeId }) => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    refetchQueries: [{ query: EMPLOYEES }],
  });
  const { data, loading } = useQuery(EMPLOYEE_BY_ID, {
    variables: {
      id: employeeId,
    },
  });

  const initialValues = !loading && {
    id: get(data, "employee.id"),
    firstName: get(data, "employee.firstName", ""),
    lastName: get(data, "employee.lastName", ""),
    email: get(data, "employee.email", ""),
    title: get(data, "employee.title", ""),
  };

  const onSubmit = async (values, dispatch) => {
    try {
      const { firstName, lastName, email, title } = values;
      console.log("onSubmit");
      console.log(values);
      await updateEmployee({
        variables: {
          id: employeeId,
          input: {
            firstName,
            lastName,
            email,
            title,
          },
        },
      });
      dispatch(destroy("Employee_Edit_Form"));
      enqueueSnackbar("Employee data successfully updated!", {
        variant: "success",
      });
      history.push("/employee");
    } catch (e) {
      console.error(e);
      enqueueSnackbar("Failed to update employee", {
        variant: "error",
      });
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.firstName) errors.firstName = "Required";
    if (!values.lastName) errors.lastName = "Required";
    if (!values.email) errors.email = "Required";

    return errors;
  };

  return children({
    onSubmit,
    validate,
    initialValues,
    loading,
  });
};
