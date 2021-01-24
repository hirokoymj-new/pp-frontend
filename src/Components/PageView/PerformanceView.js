import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Route, Switch, useParams } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";

import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { EmployeePerformanceTable } from "Components/Tables/EmployeePerformanceTable";
import { RouterButton } from "Components/Buttons/RouterButton";
import { PerformanceAddView } from "Components/PageView/PerformanceAddView";
import { PerformanceEditView } from "Components/PageView/PerformanceEditView";
import { EmployeeInfoCard } from "Components/Cards/EmployeeInfoCard";

const useStyles = makeStyles((theme) => ({
  addButton: {
    marginBottom: theme.spacing(2),
  },
}));

export const PerformanceView = () => {
  const classes = useStyles();
  const { id } = useParams();

  return (
    <>
      <DashboardLayout title="Employee Performance Reviews">
        <Grid container spacing={3} justify="center">
          <Grid item xs={12} md={5}>
            <EmployeeInfoCard employeeId={id} />
          </Grid>
          <Grid item xs={12}>
            <RouterButton
              variant="contained"
              color="secondary"
              text="Create New Review"
              to={`/review/${id}/add`}
              icon={<AddIcon />}
              className={classes.addButton}
            />
            <Paper>
              <EmployeePerformanceTable employeeId={id} />
            </Paper>
          </Grid>
        </Grid>
      </DashboardLayout>
      <Switch>
        <Route path="/review/:id/add" component={PerformanceAddView} />
        <Route path="/review/:id/edit/:pid" component={PerformanceEditView} />
      </Switch>
    </>
  );
};
