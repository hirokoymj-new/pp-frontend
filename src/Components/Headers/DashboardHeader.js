import React from "react";
import clsx from "clsx";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { openNavigation } from "Redux/Navigation/ActionCreator";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    padding: theme.spacing(0, 5, 0, 3),
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
    fontFamily: ["Titillium Web", "sans-serif"].join(","),
    fontSize: "1.5rem",
  },
  mobileMenuButton: {
    marginRight: theme.spacing(2),
  },
}));

export const DashboardHeader = connect(
  (state) => ({
    open: state.navigation.navigationOpen,
    pageTitle: state.pageTitle.title,
  }),
  { openNavigation }
)(({ openNavigation, open, pageTitle }) => {
  const classes = useStyles();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      {matches ? (
        <AppBar position="absolute">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.mobileMenuButton}
              color="inherit"
              aria-label="menu"
              onClick={openNavigation}>
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}>
              {pageTitle}
            </Typography>
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={openNavigation}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}>
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}>
              {pageTitle}
            </Typography>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
});
