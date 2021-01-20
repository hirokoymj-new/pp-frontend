import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { useHistory } from "react-router-dom";

import { EmployeeAddFormController } from "Components/FormController/EmployeeAddFormController";
import { FormTextField } from "../Forms/FormTextField";
import { FormSkeleton } from "Components/Skeleton/FormSkeleton";
import { DrawerDialog } from "Components/Dialog/DrawerDialog";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";

const EmployeeAddFormDrawer = reduxForm({
  form: "Employee_Add_Form",
})(({ handleSubmit, submitting, loading, open, onClose }) => {
  return (
    <DrawerDialog
      open={open}
      title="Create Employee"
      onClose={onClose}
      onSubmit={handleSubmit}
      submitting={submitting}
      submitLabel="Submit">
      {loading ? (
        <FormSkeleton fieldCount={3} />
      ) : (
        <>
          <Field
            name="firstName"
            component={FormTextField}
            fullWidth
            variant="outlined"
            label="First Name"
            margin="normal"
          />
          <Field
            name="lastName"
            component={FormTextField}
            fullWidth
            variant="outlined"
            label="Last Name"
            margin="normal"
          />
          <Field
            name="email"
            component={FormTextField}
            fullWidth
            variant="outlined"
            label="Email"
            margin="normal"
          />
        </>
      )}
    </DrawerDialog>
  );
});

export const EmployeeAddView = () => {
  const [open, setOpen] = useState(true);
  const history = useHistory();

  const onClose = () => {
    setOpen(false);
    history.push("/admin");
  };

  return (
    <DashboardLayout>
      <EmployeeAddFormController>
        {(props) => (
          <EmployeeAddFormDrawer {...props} open={open} onClose={onClose} />
        )}
      </EmployeeAddFormController>
    </DashboardLayout>
  );
};
