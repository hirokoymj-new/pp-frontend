import React from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "rgba(0, 0, 0, 0.8)",
    [theme.breakpoints.down("sm")]: {
      minWidth: "40px",
    },
  },
}));

export const ListItemLink = (props) => {
  const { icon, text, to, onClick } = props;
  const classes = useStyles();

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem
        button
        component={renderLink}
        onClick={onClick ? onClick : null}
      >
        <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </li>
  );
};

export const ListLink = ({ icon, text, to }) => {
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();

  return (
    <ListItem>
      <Link href={to} onClick={preventDefault}>
        <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </Link>
    </ListItem>
  );
};

ListItemLink.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};
