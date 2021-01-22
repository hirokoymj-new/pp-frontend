import React from "react";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.common.white,
    fontSize: "1.1rem",
  },
}));

export const RouterButton = ({ to, text, icon }) => {
  const classes = useStyles();

  return (
    <Link component={RouterLink} to={to} underline="none">
      <Button
        variant="contained"
        color="secondary"
        startIcon={icon}
        classes={{ root: classes.root }}>
        {text}
      </Button>
    </Link>
  );
};
