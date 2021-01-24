import React from "react";
import { default as MuiTable } from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import { TableSkeleton } from "Components/Skeleton/TableSkeleton";

export const TableWithCollapse = ({ data, colmuns, loading }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      {loading ? (
        <TableSkeleton />
      ) : (
        <>
          <MuiTable aria-label="simple table" size="small">
            <TableHead>
              <TableRow>
                <TableCell />
                {colmuns.map(({ label, align }, key) => {
                  return (
                    <TableCell
                      key={key}
                      align={align}
                      style={{ whiteSpace: "nowrap" }}>
                      {label}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((d, index) => {
                return (
                  <>
                    <TableRow key={index}>
                      <>
                        <TableCell>
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}>
                            {open ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </IconButton>
                        </TableCell>
                        {colmuns.map((col, key) => {
                          return (
                            <TableCell scope="row" key={key} align={col.align}>
                              {d[col.field]}
                            </TableCell>
                          );
                        })}
                      </>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                          aaaaa
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
            </TableBody>
          </MuiTable>
        </>
      )}
    </>
  );
};
