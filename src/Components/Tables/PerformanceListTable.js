import React from "react";
import { useQuery } from "@apollo/react-hooks";
import get from "lodash/get";
import map from "lodash/map";
import moment from "moment";

import { ALL_PERFORMANCES } from "Queries/Performance";
import { TableWithCollapse } from "Components/Tables/TableWithCollapse";
import { Title } from "Components/Titles/Title";
import { ActionLinkButton } from "Components/Buttons/ActionLinkButton";
import { ActionRouterButton } from "Components/Buttons/ActionRouterButton";

export const PerformanceListTable = ({ openDialog }) => {
  const { data, loading } = useQuery(ALL_PERFORMANCES);
  const performances = !loading && get(data, "performances", []);

  console.log(data);

  const mappedData = map(
    performances,
    ({ id, title, employee, evaluator, createdAt }) => {
      const created = moment(createdAt).format("MM/DD/YYYY");
      const employeeFullName =
        get(employee, "firstName", "") + " " + get(employee, "lastName", "");

      const evaluatorFullName =
        get(evaluator, "firstName", "") + " " + get(evaluator, "lastName", "");

      const actions = (
        <>
          <ActionRouterButton
            to={`/performanceList/feedback/${id}`}
            title="Feedback"
            icon="edit"
          />
          <ActionLinkButton onClick={(e) => openDialog(e, id)} icon="delete" />
        </>
      );

      return {
        id,
        title,
        employeeFullName,
        evaluatorFullName,
        created,
        actions,
      };
    }
  );

  return (
    <>
      <Title text="Performance List" />
      <TableWithCollapse
        data={mappedData}
        loading={loading}
        colmuns={[
          {
            label: "Title",
            field: "title",
          },
          {
            label: "Employee",
            field: "employeeFullName",
          },
          {
            label: "Evaluator",
            field: "evaluatorFullName",
          },
          {
            label: "Created On",
            field: "created",
          },
          {
            label: "Feedback",
            field: "actions",
          },
        ]}
      />
    </>
  );
};
