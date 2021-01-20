import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { setTitle } from "Redux/Title/ActionCreator";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& .MuiFormControl-root": {
      marginBottom: theme.spacing(2),
    },
    "& .MuiPaper-root": {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
    },
    "& .MuiTableCell-head": {
      fontWeight: 600,
    },
  },
  container: {
    padding: (props) => (props.fullWidth ? "0 !important" : theme.spacing(4)),
    maxWidth: (props) => props.fullWidth && "100%",
    [theme.breakpoints.down("sm")]: {
      padding: "16px !important",
    },
  },
}));

export const DashboardLayout = connect(null, { setTitle })(
  ({ setTitle, children, maxWidth, fullWidth, title }) => {
    const classes = useStyles({ fullWidth });
    const location = useLocation();

    if (location.state) {
      setTitle(location.state.title);
    } else if (title) {
      setTitle(title);
    } else {
      setTitle("");
    }

    return (
      <div className={classes.root}>
        <Container
          maxWidth={maxWidth ? maxWidth : "lg"}
          className={classes.container}
        >
          {children}
        </Container>
      </div>
    );
  }
);

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
