import React from "react";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles((theme) => ({
  iconButtonRoot: {
    backgroundColor: "#3949ab",
    padding: theme.spacing(1),
    margin: theme.spacing(0, 1),
    "&:hover": {
      backgroundColor: "#7986cb",
    },
  },
  svgIconRoot: {
    color: theme.palette.common.white,
    fontSize: "1.3rem",
    textAlign: "center",
    fontWeight: 400,
  },
}));

export const ActionLinkButton = ({ icon, onClick }) => {
  const classes = useStyles();

  return (
    <Link href="#" onClick={onClick}>
      <IconButton classes={{ root: classes.iconButtonRoot }}>
        <Icon classes={{ root: classes.svgIconRoot }}>{icon}</Icon>
      </IconButton>
    </Link>
  );
};
