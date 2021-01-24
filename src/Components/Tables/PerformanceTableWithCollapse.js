import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { useQuery } from "@apollo/react-hooks";
import get from "lodash/get";
import AddIcon from "@material-ui/icons/Add";

import { ALL_PERFORMANCES } from "Queries/Performance";
import { FeedbackCard } from "Components/Cards/FeedbackCard";
import { TableSkeleton } from "Components/Skeleton/TableSkeleton";
import { RouterButton } from "Components/Buttons/RouterButton";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  feedbackRow: {
    backgroundColor: "#e8eaf6",
    paddingBottom: 0,
    paddingTop: 0,
  },
  feedbackBtn: {
    fontSize: "0.875rem",
  },
}));

const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const id = get(row, "id");
  const title = get(row, "title");
  const employeeFullName =
    get(row, "employee.firstName") + " " + get(row, "employee.lastName");
  const evaluatorFullName =
    get(row, "evaluator.firstName") + " " + get(row, "evaluator.lastName");
  const feedbacks = get(row, "feedbacks", []).sort((a, b) =>
    a.id < b.id ? 1 : -1
  );
  const actions = (
    <>
      <RouterButton
        to={`/performanceList/feedback/${id}`}
        text="Feedback"
        icon={<AddIcon />}
        className={classes.feedbackBtn}
      />
    </>
  );

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{title}</TableCell>
        <TableCell>{employeeFullName}</TableCell>
        <TableCell>{evaluatorFullName}</TableCell>
        <TableCell>{actions}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={classes.feedbackRow} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Feedback
              </Typography>
              {feedbacks.map((data, index) => {
                return <FeedbackCard key={index} data={data} />;
              })}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export const PerformanceTableWithCollapse = () => {
  const { data, loading } = useQuery(ALL_PERFORMANCES);
  const performances = !loading && get(data, "performances", []);

  return (
    <>
      {loading ? (
        <TableSkeleton />
      ) : (
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Title</TableCell>
              <TableCell>Employee</TableCell>
              <TableCell>Evaluator</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {performances.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};
