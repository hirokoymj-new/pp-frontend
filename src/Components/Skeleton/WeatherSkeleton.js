import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 119,
    "& span": {
      backgroundColor: "rgb(76, 103, 134) !important",
    },
  },
  marginBottom: {
    marginBottom: theme.spacing(2),
  },
}));

export const DailyForecastSkeleton = () => {
  return (
    <>
      <Skeleton component="div" width="100%">
        <Typography component="h2" variant="h1">
          .
        </Typography>
      </Skeleton>
      <Skeleton variant="rect" component="div" width="100%" height="450px" />
    </>
  );
};

export const CurrentWeatherSkeleton = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Skeleton variant="text" height={45} />
      <Skeleton variant="text" height={20} />
    </div>
  );
};

export const CurrentWeatherInfoSkeleton = () => {
  const classes = useStyles();
  return (
    <Paper style={{ minHeight: "250px", justifyContent: "center" }}>
      <Skeleton
        component="div"
        variant="text"
        width="30%"
        classes={{ root: classes.marginBottom }}
      />
      <Skeleton
        component="div"
        variant="rect"
        height={40}
        width="60%"
        classes={{ root: classes.marginBottom }}
      />
      <Skeleton
        component="div"
        variant="rect"
        height={40}
        width="60%"
        classes={{ root: classes.marginBottom }}
      />
      <Skeleton
        component="div"
        variant="text"
        width="60%"
        classes={{ root: classes.marginBottom }}
      />
    </Paper>
  );
};
