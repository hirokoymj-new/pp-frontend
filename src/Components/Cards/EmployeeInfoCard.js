import React from "react";
import { useQuery } from "@apollo/react-hooks";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";

import { EMPLOYEE_BY_ID } from "Queries/Employee";
import AvatarImg from "Assets/images/BeckSimpson.jpeg";

const useStyles = makeStyles((theme) => ({
  avatarRoot: {
    width: "120px",
    height: "120px",
  },
}));

export const EmployeeInfoCard = ({ employeeId }) => {
  const classes = useStyles();
  const { data, loading } = useQuery(EMPLOYEE_BY_ID, {
    variables: { id: employeeId },
  });

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
