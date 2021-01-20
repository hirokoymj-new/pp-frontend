import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { TaskTable } from "Components/Tables/TaskTable";

export const TaskView = () => {
  return (
    <DashboardLayout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1>Task View</h1>
          <Paper>
            <TaskTable />
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};
