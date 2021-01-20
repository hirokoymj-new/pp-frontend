import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  titleRoot: {
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
    textAlign: "center",
    padding: theme.spacing(1),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
    padding: "6px",
  },
  actionButton: {
    width: "25%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  actionsRoot: {
    borderTop: `1px solid ${theme.palette.grey[400]}`,
    padding: theme.spacing(2, 3),
    justifyContent: "center",
  },
  contentRoot: {
    minHeight: "100px",
    padding: theme.spacing(3),
  },
  contentTextRoot: {
    color: theme.palette.common.black,
  },
}));

export const AlertDialog = ({
  open,
  title,
  content,
  action,
  actionLabel,
  onClose,
}) => {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle classes={{ root: classes.titleRoot }}>
        <Typography variant="h6">{title}</Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent classes={{ root: classes.contentRoot }}>
        <DialogContentText classes={{ root: classes.contentTextRoot }}>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions classes={{ root: classes.actionsRoot }}>
        <Button
          color="primary"
          variant="outlined"
          className={classes.actionButton}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={action}
          className={classes.actionButton}
        >
          {actionLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
