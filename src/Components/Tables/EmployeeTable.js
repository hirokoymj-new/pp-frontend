import React from "react";
import { useQuery } from "@apollo/react-hooks";
import get from "lodash/get";
import map from "lodash/map";
import moment from "moment";

import { EMPLOYEES } from "Queries/Employee";
import { Table } from "Components/Tables/Table";
import { Title } from "Components/Titles/Title";
import { ActionRouterButton } from "Components/Buttons/ActionRouterButton";
import { ActionLinkButton } from "Components/Buttons/ActionLinkButton";
import { RouterButton } from "Components/Buttons/RouterButton";

export const EmployeeTable = ({ openDialog }) => {
  const { data, loading } = useQuery(EMPLOYEES);
  const employees = !loading && get(data, "employees", []);

  const mappedData = map(
    employees,
    ({ id, firstName, lastName, email, title, createdAt }) => {
      const actions = (
        <>
          <ActionRouterButton
            to={`/admin/edit/${id}`}
            title="Edit Employee"
            icon="edit"
          />
          <ActionLinkButton onClick={(e) => openDialog(e, id)} icon="delete" />
          <RouterButton text="Review" to={`/review/${id}`} />
        </>
      );
      const created = moment(createdAt).format("MM/DD/YYYY");

      return {
        id,
        firstName,
        lastName,
        email,
        title,
        created,
        actions,
      };
    }
  );

  return (
    <>
      <Title text="Employee List" />
      <Table
        data={mappedData}
        loading={loading}
        colmuns={[
          {
            label: "First Name",
            field: "firstName",
          },
          {
            label: "Last Name",
            field: "lastName",
          },
          {
            label: "Title",
            field: "title",
          },
          {
            label: "Email",
            field: "email",
          },
          {
            label: "Created On",
            field: "created",
          },
          {
            label: "Actions",
            field: "actions",
            align: "center",
          },
        ]}
      />
    </>
  );
};
