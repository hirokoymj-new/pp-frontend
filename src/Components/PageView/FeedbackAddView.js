import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { useHistory, useParams } from "react-router-dom";
import Divider from "@material-ui/core/Divider";

import { FeedbackAddFormController } from "Components/FormController/FeedbackAddFormController";
import { FormTextField } from "../Forms/FormTextField";
import { FormSkeleton } from "Components/Skeleton/FormSkeleton";
import { DrawerDialog } from "Components/Dialog/DrawerDialog";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { PerformanceInfoCard } from "Components/Cards/PerformanceInfoCard";

const FeedbackAddFormDrawer = reduxForm({
  form: "Feedback_Add_Form",
})(({ handleSubmit, submitting, loading, open, onClose, performanceId }) => {
  return (
    <DrawerDialog
      open={open}
      title="Create Feedback"
      onClose={onClose}
      onSubmit={handleSubmit}
      submitting={submitting}
      submitLabel="Submit">
      {loading ? (
        <FormSkeleton fieldCount={2} />
      ) : (
        <>
          <PerformanceInfoCard id={performanceId} />
          <Divider />
          <Field
            name="name"
            component={FormTextField}
            fullWidth
            variant="outlined"
            label="Your Name"
            margin="normal"
          />
          <Field
            name="comment"
            component={FormTextField}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="Feedback"
            margin="normal"
          />
        </>
      )}
    </DrawerDialog>
  );
});

export const FeedbackAddView = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(true);
  const history = useHistory();

  const onClose = () => {
    setOpen(false);
    history.push("/performanceList");
  };

  return (
    <DashboardLayout>
      <FeedbackAddFormController performanceId={id}>
        {(props) => (
          <FeedbackAddFormDrawer
            {...props}
            open={open}
            onClose={onClose}
            performanceId={id}
          />
        )}
      </FeedbackAddFormController>
    </DashboardLayout>
  );
};
