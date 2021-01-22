import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { useParams, useHistory } from "react-router-dom";

import { EmployeeEditFormController } from "Components/FormController/EmployeeEditFormController";
import { FormTextField } from "../Forms/FormTextField";
import { FormSkeleton } from "Components/Skeleton/FormSkeleton";
import { DrawerDialog } from "Components/Dialog/DrawerDialog";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";

const EmployeeEditFormDrawer = reduxForm({
  form: "Employee_Edit_Form",
})(({ handleSubmit, submitting, loading, open, onClose }) => {
  return (
    <DrawerDialog
      open={open}
      title="Edit Employee"
      onClose={onClose}
      onSubmit={handleSubmit}
      submitting={submitting}
      submitLabel="Edit">
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
            name="title"
            component={FormTextField}
            fullWidth
            variant="outlined"
            label="Title"
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

export const EmployeeEditView = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(true);
  const history = useHistory();

  const onClose = () => {
    setOpen(false);
    history.push("/admin");
  };

  return (
    <DashboardLayout>
      <EmployeeEditFormController employeeId={id}>
        {(props) => (
          <EmployeeEditFormDrawer {...props} open={open} onClose={onClose} />
        )}
      </EmployeeEditFormController>
    </DashboardLayout>
  );
};
