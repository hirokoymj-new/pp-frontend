import React from "react";
import { useQuery } from "@apollo/react-hooks";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Route, Switch, useParams } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";

import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { PerformanceTable } from "Components/Tables/PerformanceTable";
import { EMPLOYEE_BY_ID } from "Queries/Employee";
import { RouterButton } from "Components/Buttons/RouterButton";
import AvatarImg from "Assets/images/BeckSimpson.jpeg";
import { PerformanceAddView } from "Components/PageView/PerformanceAddView";

const useStyles = makeStyles((theme) => ({
  avatarRoot: {
    width: "120px",
    height: "120px",
  },
}));

const EmployeeInfoCard = ({ employeeId }) => {
  const classes = useStyles();
  const { data, loading } = useQuery(EMPLOYEE_BY_ID, {
    variables: { id: employeeId },
  });
  if (!loading) {
    console.log(data);
  }
  const employee = !loading && get(data, "employee", {});
  const fullName = !isEmpty(employee)
    ? `${employee.firstName} ${employee.lastName}`
    : "";
  const title = get(employee, "title", "");
  const email = get(employee, "email", "");

  return (
    <Paper>
      <Grid container>
        <Grid item xs={4}>
          <Avatar
            alt={fullName}
            src={AvatarImg}
            classes={{ root: classes.avatarRoot }}
          />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h5" component="h3">
            {fullName}
          </Typography>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="h6">{email}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export const PerformanceView = () => {
  const { id } = useParams();

  return (
    <>
      <Switch>
        {/* <Route path={`/admin/edit/:id`} component={EmployeeEditView} /> */}
        <Route path={`/review/add/:id`} component={PerformanceAddView} />
      </Switch>
      <DashboardLayout title="Performance Review">
        <Grid container spacing={3} justify="center">
          <Grid item xs={12} md={5}>
            <EmployeeInfoCard employeeId={id} />
          </Grid>
          <Grid item xs={12}>
            <RouterButton
              variant="contained"
              color="secondary"
              text="Create New Review"
              to={`/review/add/${id}`}
              icon={<AddIcon />}
            />
            <Paper>
              <PerformanceTable employeeId={id} />
            </Paper>
          </Grid>
        </Grid>
      </DashboardLayout>
    </>
  );
};
