import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Route, Switch } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";

import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { FeedbackAddView } from "Components/PageView/FeedbackAddView";
import { CollapsibleTable } from "Components/Tables/CollapsibleTable";
import { Title } from "Components/Titles/Title";

// const useStyles = makeStyles((theme) => ({
//   addButton: {
//     marginBottom: theme.spacing(2),
//   },
// }));

export const PerformanceListView = () => {
  // const classes = useStyles();

  return (
    <>
      <DashboardLayout title="Performance List">
        <Grid container spacing={3} justify="center">
          <Grid item xs={12}>
            <Paper>
              <Title text="Performance List" />
              <CollapsibleTable />
            </Paper>
          </Grid>
        </Grid>
      </DashboardLayout>
      <Switch>
        <Route
          path={`/performanceList/feedback/:id`}
          component={FeedbackAddView}
        />
      </Switch>
    </>
  );
};
