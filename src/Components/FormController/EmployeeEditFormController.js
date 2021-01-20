import { destroy } from "redux-form";
import { useQuery, useMutation } from "@apollo/react-hooks";
import get from "lodash/get";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

import { UPDATE_EMPLOYEE } from "Mutations/Employee";
import { EMPLOYEES, EMPLOYEE_BY_ID } from "Queries/Employee";

export const EmployeeEditFormController = ({ children, employeeId }) => {
  console.log("Employee Edit Form Controller");
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [updateCategory] = useMutation(UPDATE_EMPLOYEE, {
    refetchQueries: [{ query: EMPLOYEES }],
  });
  const { data, loading } = useQuery(EMPLOYEE_BY_ID, {
    variables: {
      id: employeeId,
    },
  });

  console.log(data);

  const initialValues = !loading && {
    id: get(data, "employee.id"),
    firstName: get(data, "employee.firstName", ""),
    lastName: get(data, "employee.lastName", ""),
    email: get(data, "employee.email", ""),
  };

  const onSubmit = async (values, dispatch) => {
    try {
      const { firstName, lastName, email } = values;
      await updateCategory({
        variables: {
          id: employeeId,
          input: {
            firstName,
            lastName,
            email,
          },
        },
      });
      dispatch(destroy("Employee_Edit_Form"));
      enqueueSnackbar("Employee data successfully updated!", {
        variant: "success",
      });
      history.push("/employeeList");
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
