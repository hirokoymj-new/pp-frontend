import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { useParams, useHistory } from "react-router-dom";

import { PerformanceEditFormController } from "Components/FormController/PerformanceEditFormController";
import { performance_title_options, score_options } from "Config/staticData";
import { FormTextField } from "../Forms/FormTextField";
import { FormSkeleton } from "Components/Skeleton/FormSkeleton";
import { DrawerDialog } from "Components/Dialog/DrawerDialog";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { FormSelect } from "Components/Forms/FormSelect";
import { FormRadioGroup } from "Components/Forms/FormRadioGroup";

const PerformanceEditFormDrawer = reduxForm({
  form: "Performance_Edit_Form",
})(
  ({
    handleSubmit,
    submitting,
    loading,
    open,
    onClose,
    employee_options,
    initialValues,
  }) => {
    console.log("PerformanceEditDrawer");
    console.log(initialValues);
    return (
      <DrawerDialog
        open={open}
        title="Edit Performance"
        onClose={onClose}
        onSubmit={handleSubmit}
        submitting={submitting}
        submitLabel="Edit">
        {loading ? (
          <FormSkeleton fieldCount={3} />
        ) : (
          <>
            <Field
              name="title"
              component={FormSelect}
              fullWidth
              variant="outlined"
              label="Title"
              margin="normal"
              options={performance_title_options}
            />
            <Field
              name="evaluator"
              component={FormSelect}
              fullWidth
              variant="outlined"
              label="Evaluator"
              margin="normal"
              options={employee_options}
            />
            <Field
              name="communication"
              component={FormRadioGroup}
              fullWidth
              variant="outlined"
              label="Communication Skills"
              margin="normal"
              options={score_options}
              row
            />
            <Field
              name="teamPlayer"
              component={FormRadioGroup}
              fullWidth
              variant="outlined"
              label="Is she/he a Team Player"
              margin="normal"
              options={score_options}
              row
            />
            <Field
              name="comment"
              component={FormTextField}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              label="Comment"
              margin="normal"
            />
          </>
        )}
      </DrawerDialog>
    );
  }
);

export const PerformanceEditView = ({ employeeId }) => {
  const { id } = useParams();
  const [open, setOpen] = useState(true);
  const history = useHistory();

  const onClose = () => {
    setOpen(false);
    history.push({
      pathname: "/review",
      state: { employeeId },
    });
  };

  return (
    <DashboardLayout>
      <PerformanceEditFormController performanceId={id} employeeId={employeeId}>
        {(props) => (
          <PerformanceEditFormDrawer {...props} open={open} onClose={onClose} />
        )}
      </PerformanceEditFormController>
    </DashboardLayout>
  );
};
