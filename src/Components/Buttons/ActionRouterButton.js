import React from "react";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles((theme) => ({
  iconButtonRoot: {
    backgroundColor: green[500],
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    "&:hover": {
      backgroundColor: green[200],
    },
  },
  svgIconRoot: {
    color: theme.palette.common.white,
    fontSize: "1.3rem",
    textAlign: "center",
    fontWeight: 400,
  },
}));

export const ActionRouterButton = ({ to, title, icon }) => {
  const classes = useStyles();

  return (
    <Link
      component={RouterLink}
      // to={{
      //   pathname: to,
      //   state: { title },
      // }}
      to={to}>
      <IconButton classes={{ root: classes.iconButtonRoot }}>
        <Icon classes={{ root: classes.svgIconRoot }}>{icon}</Icon>
      </IconButton>
    </Link>
  );
};
