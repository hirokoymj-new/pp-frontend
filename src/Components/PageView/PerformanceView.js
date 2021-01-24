import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Route, Switch, useLocation } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import get from "lodash/get";
import { makeStyles } from "@material-ui/core/styles";

import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { PerformanceTable } from "Components/Tables/PerformanceTable";
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
  const location = useLocation();
  console.log(location);
  const employeeId = get(location, "state.employeeId");

  return (
    <>
      <Switch>
        <Route path="/review/add/:eid" component={PerformanceAddView} />
        <Route
          path="/review/edit/:id"
          render={() => <PerformanceEditView employeeId={employeeId} />}
        />
      </Switch>
      <DashboardLayout title="Performance Review">
        <h1>{employeeId}</h1>
        <Grid container spacing={3} justify="center">
          <Grid item xs={12} md={5}>
            <EmployeeInfoCard employeeId={employeeId} />
          </Grid>
          <Grid item xs={12}>
            <RouterButton
              variant="contained"
              color="secondary"
              text="Create New Review"
              to={`/review/add/${employeeId}`}
              icon={<AddIcon />}
              className={classes.addButton}
            />
            <Paper>
              <PerformanceTable employeeId={employeeId} />
            </Paper>
          </Grid>
        </Grid>
      </DashboardLayout>
    </>
  );
};


