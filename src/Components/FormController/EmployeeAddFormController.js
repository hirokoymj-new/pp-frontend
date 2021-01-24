import { destroy } from "redux-form";
import { useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

import { CREATE_EMPLOYEE } from "Mutations/Employee";
import { EMPLOYEES } from "Queries/Employee";
import { emailRegex } from "Config/staticData";

export const EmployeeAddFormController = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [createEmployee] = useMutation(CREATE_EMPLOYEE, {
    refetchQueries: [{ query: EMPLOYEES }],
  });

  const onSubmit = async (values, dispatch) => {
    try {
      await createEmployee({
        variables: {
          input: {
            ...values,
          },
        },
      });
      dispatch(destroy("Employee_Add_Form"));
      enqueueSnackbar("Employee successfully created!", {
        variant: "success",
      });
      history.push("/employee");
    } catch (e) {
      console.error(e);
      enqueueSnackbar("Failed to create employee", {
        variant: "error",
      });
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.firstName) errors.firstName = "Required";
    if (!values.lastName) errors.lastName = "Required";
    if (!values.email) {
      errors.email = "Enter a valid email";
    } else {
      if (!emailRegex.test(values.email)) {
        errors.email = "Enter a valid email";
      }
    }
    return errors;
  };

  return children({
    onSubmit,
    validate,
  });
};
