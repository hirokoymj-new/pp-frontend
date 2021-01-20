import React from "react";
import LibraryBooksOutlinedIcon from "@material-ui/icons/LibraryBooksOutlined";

import { ListItemLink } from "Components/Lists/ListItemLink";

export const TechNavItems = ({ setDrawerClosed }) => {
  return (
    <>
      <ListItemLink
        to="/admin"
        text="Admin"
        icon={<LibraryBooksOutlinedIcon />}
        onClick={setDrawerClosed && setDrawerClosed}
      />
      <ListItemLink
        to="/performance"
        text="Performance"
        icon={<LibraryBooksOutlinedIcon />}
        onClick={setDrawerClosed && setDrawerClosed}
      />
    </>
  );
};
