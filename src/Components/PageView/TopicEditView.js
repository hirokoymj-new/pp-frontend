import React, { useState } from "react";
import { Field, formValues, reduxForm } from "redux-form";
import { compose } from "recompose";
import { useParams, useHistory } from "react-router-dom";

import { TopicEditFormController } from "Components/FormController/TopicEditFormController";
import { FormTextField } from "Components/Forms/FormTextField";
import { FormSelect } from "Components/Forms/FormSelect";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { FormSkeleton } from "Components/Skeleton/FormSkeleton";
import { DrawerDialog } from "Components/Dialog/DrawerDialog";

const TopicEditFormDrawer = compose(
  reduxForm({
    form: "Topic_Edit_Form",
  }),
  formValues({
    categoryId: "category",
  })
)(
  ({
    handleSubmit,
    submitting,
    category_options,
    subCategory_options,
    loading,
    open,
    onClose,
    categoryId,
  }) => {
    console.log("TopicEditFormDrawer");
    console.log(subCategory_options);
    console.log(categoryId);
    return (
      <>
        <DrawerDialog
          open={open}
          title="Edit Topic"
          onClose={onClose}
          onSubmit={handleSubmit}
          submitting={submitting}
          submitLabel="Edit"
        >
          {loading ? (
            <FormSkeleton fieldCount={4} />
          ) : (
            <>
              <Field
                name="category"
                component={FormSelect}
                fullWidth
                variant="outlined"
                label="Category"
                options={category_options}
                margin="normal"
              />
              <Field
                name="subCategory"
                component={FormSelect}
                fullWidth
                variant="outlined"
                label="Sub Category"
                options={subCategory_options.filter(
                  (option) => option.categoryId === categoryId
                )}
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
                name="url"
                component={FormTextField}
                fullWidth
                variant="outlined"
                label="URL"
                margin="normal"
              />
            </>
          )}
        </DrawerDialog>
      </>
    );
  }
);

// const TopicEditFormDrawer = reduxForm({
//   form: "Topic_Edit_Form",
// })(
//   ({
//     handleSubmit,
//     submitting,
//     category_options,
//     subCategory_options,
//     loading,
//     open,
//     onClose,
//   }) => {
//     return (
//     );
//   }
// );

export const TopicEditView = () => {
  const { id } = useParams();
  console.log(id);
  const [open, setOpen] = useState(true);
  const history = useHistory();

  const onClose = () => {
    setOpen(false);
    history.push("/categoryList");
  };

  return (
    <DashboardLayout>
      <TopicEditFormController topicId={id}>
        {(props) => (
          <TopicEditFormDrawer {...props} open={open} onClose={onClose} />
        )}
      </TopicEditFormController>
    </DashboardLayout>
  );
};
