import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  marginBottom: {
    marginBottom: theme.spacing(1),
  },
}));

export const TableSkeleton = () => {
  const classes = useStyles();

  return (
    <>
      <Skeleton width="100%" className={classes.marginBottom}>
        <Typography variant="h2">.</Typography>
      </Skeleton>
      <Skeleton variant="rect" width="100%" height="450px" />
    </>
  );
};
