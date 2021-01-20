import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(1),
  },
  fieldItem: {
    marginBottom: theme.spacing(2),
    height: "45px",
    width: "100%",
  },
  button: {
    borderRadius: theme.spacing(1),
  },
}));

export const FormSkeleton = ({ fieldCount }) => {
  const classes = useStyles();

  var fieldItems = [];
  for (var i = 0; i < fieldCount; i++) {
    fieldItems.push(
      <Skeleton
        variant="rect"
        width="100%"
        height={45}
        className={classes.fieldItem}
        key={i}
      />
    );
  }

  return (
    <>
      <Skeleton width="35%" className={classes.title}>
        <Typography variant="h2">.</Typography>
      </Skeleton>
      {fieldItems}
      <Skeleton
        variant="rect"
        width="25%"
        height={40}
        className={classes.button}
      />
    </>
  );
};
