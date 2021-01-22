import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";

import { DashboardHeader } from "Components/Headers/DashboardHeader";
import { MenuDrawer, MobileMenuDrawer } from "Components/Drawers/MenuDrawer";
import { PerformanceView } from "Components/PageView/PerformanceView";
import { EmployeeView } from "Components/PageView/EmployeeView";
import {
  closeNavigation,
  openNavigation,
} from "Redux/Navigation/ActionCreator";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
}));

export const DashboardController = connect(null, {
  closeNavigation,
  openNavigation,
})(({ closeNavigation, openNavigation }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  if (matches) {
    closeNavigation();
  } else {
    openNavigation();
  }

  return (
    <div className={classes.root}>
      <DashboardHeader />
      {matches ? <MobileMenuDrawer /> : <MenuDrawer />}
      <SnackbarProvider
        maxSnack={1}
        dense
        preventDuplicate
        anchorOrigin={
          matches
            ? { horizontal: "center", vertical: "bottom" }
            : { horizontal: "left", vertical: "top" }
        }
        autoHideDuration={2500}>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <Redirect to="/employee" />;
              }}
            />
            <Route path="/employee" component={EmployeeView} />
            <Route path="/review" component={PerformanceView} />
          </Switch>
        </main>
      </SnackbarProvider>
    </div>
  );
});
