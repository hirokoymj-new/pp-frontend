import React from "react";
import { useQuery } from "@apollo/react-hooks";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import get from "lodash/get";
import isNull from "lodash/isNull";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

import { PERFORMANCE } from "Queries/Performance";
import { ListSkeleton } from "Components/Skeleton/ListSkeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    border: `1px solid ${theme.palette.grey[400]}`,
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

export const PerformanceInfoCard = ({ id }) => {
  const classes = useStyles();
  const { data, loading } = useQuery(PERFORMANCE, { variables: { id } });
  if (!loading) console.log(data);
  const performance = !loading && get(data, "performance", {});
  const title = get(performance, "title");
  const teamPlayer = isNull(get(performance, "teamPlayer"))
    ? "0"
    : get(performance, "teamPlayer");
  const communication = isNull(get(performance, "communication"))
    ? "0"
    : get(performance, "communication");
  const fullName = `${get(performance, "employee.firstName")} ${get(
    performance,
    "employee.lastName"
  )}`;
  const evaluatorfullName = `${get(performance, "evaluator.firstName")} ${get(
    performance,
    "evaluator.lastName"
  )}`;
  const created = moment(get(performance, "createdAt")).format("MM/DD/YYYY");

  return (
    <>
      {loading ? (
        <ListSkeleton />
      ) : (
        <Card className={classes.root}>
          <CardContent>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <b>{title} Summary</b>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">Employee Name:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" align="right">
                  {fullName}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">Evaluated By:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" align="right">
                  {evaluatorfullName}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">Evaluated On:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" align="right">
                  {created}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">Team Player:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" align="right">
                  {teamPlayer} point
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">Communication Skill:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" align="right">
                  {communication} point
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </>
  );
};
