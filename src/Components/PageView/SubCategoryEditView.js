import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { useParams, useHistory } from "react-router-dom";

import { SubCategoryEditFormController } from "Components/FormController/SubCategoryEditFormController";
import { FormTextField } from "Components/Forms/FormTextField";
import { FormSelect } from "Components/Forms/FormSelect";

import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { FormSkeleton } from "Components/Skeleton/FormSkeleton";
import { DrawerDialog } from "Components/Dialog/DrawerDialog";

const SubCategoryEditFormDrawer = reduxForm({
  form: "Sub_Category_Edit_Form",
})(
  ({
    handleSubmit,
    submitting,
    category_options,
    initialValues,
    loading,
    open,
    onClose,
  }) => {
    return (
      <DrawerDialog
        open={open}
        title="Edit Sub Category"
        onClose={onClose}
        onSubmit={handleSubmit}
        submitting={submitting}
        submitLabel="Edit"
      >
        {loading ? (
          <FormSkeleton fieldCount={3} />
        ) : (
          <>
            <Field
              name="categoryId"
              component={FormSelect}
              fullWidth
              variant="outlined"
              label="Category"
              placeholder="Select Category"
              options={category_options}
              margin="normal"
            />
            <Field
              name="name"
              component={FormTextField}
              fullWidth
              variant="outlined"
              label="Sub Category Name"
              margin="normal"
            />
          </>
        )}
      </DrawerDialog>
    );
  }
);

export const SubCategoryEditView = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(true);
  const history = useHistory();

  const onClose = () => {
    setOpen(false);
    history.push("/subCategoryList");
  };

  return (
    <DashboardLayout>
      <SubCategoryEditFormController subCategoryId={id}>
        {(props) => (
          <SubCategoryEditFormDrawer {...props} open={open} onClose={onClose} />
        )}
      </SubCategoryEditFormController>
    </DashboardLayout>
  );
};
