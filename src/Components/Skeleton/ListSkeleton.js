import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    padding: theme.spacing(0, 2, 2, 2) + " !important",
  },
}));

export const ListSkeleton = () => {
  const classes = useStyles();

  return (
    <Paper classes={{ root: classes.paperRoot }}>
      <Skeleton width="100%">
        <Typography variant="h2">.</Typography>
      </Skeleton>
      <Skeleton variant="rect" width="100%" height={380} />
    </Paper>
  );
};
