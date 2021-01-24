import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import get from "lodash/get";
import moment from "moment";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  feedbackCard: {
    marginBottom: theme.spacing(2),
  },
}));

export const FeedbackCard = ({ data }) => {
  const classes = useStyles();
  const name = get(data, "name", "");
  const letter = name.charAt(0).toUpperCase();
  const comment = get(data, "comment");
  const createdAt = moment(get(data, "createdAt")).format("MM/DD/YYYY h:mm a");

  return (
    <Card className={classes.feedbackCard}>
      <CardHeader
        avatar={<Avatar className={classes.avatar}>{letter}</Avatar>}
        title={name}
        subheader={createdAt}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {comment}
        </Typography>
      </CardContent>
    </Card>
  );
};
