import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { useHistory, useParams } from "react-router-dom";

import { PerformanceAddFormController } from "Components/FormController/PerformanceAddFormController";
import { performance_title_options, score_options } from "Config/staticData";
import { FormTextField } from "Components/Forms/FormTextField";
import { FormSelect } from "Components/Forms/FormSelect";
import { FormRadioGroup } from "Components/Forms/FormRadioGroup";
import { FormSkeleton } from "Components/Skeleton/FormSkeleton";
import { DrawerDialog } from "Components/Dialog/DrawerDialog";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";

const PerformanceAddFormDrawer = reduxForm({
  form: "Performance_Add_Form",
})(({ handleSubmit, submitting, loading, open, onClose, employee_options }) => {
  return (
    <DrawerDialog
      open={open}
      title="Create Performance"
      onClose={onClose}
      onSubmit={handleSubmit}
      submitting={submitting}
      submitLabel="Submit">
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
});

export const PerformanceAddView = () => {
  const { eid } = useParams();
  console.log("PerformanceAddView", eid);

  const [open, setOpen] = useState(true);
  const history = useHistory();
  const onClose = () => {
    setOpen(false);
    history.push({
      pathname: "/review",
      state: { employeeId: eid },
    });
  };

  return (
    <DashboardLayout>
      <PerformanceAddFormController employeeId={eid}>
        {(props) => (
          <PerformanceAddFormDrawer {...props} open={open} onClose={onClose} />
        )}
      </PerformanceAddFormController>
    </DashboardLayout>
  );
};
