import React from "react";
import { useQuery } from "@apollo/react-hooks";
import get from "lodash/get";
import map from "lodash/map";
import moment from "moment";

import { PERFORMANCE_BY_EMPLOYEE } from "Queries/Performance";
import { Table } from "Components/Tables/Table";
import { Title } from "Components/Titles/Title";
import { ActionRouterButton } from "Components/Buttons/ActionRouterButton";

export const EmployeePerformanceTable = ({ openDialog, employeeId }) => {
  const { data, loading } = useQuery(PERFORMANCE_BY_EMPLOYEE, {
    variables: { eid: employeeId },
  });
  const performances = !loading && get(data, "performanceByEmployee", []);

  const mappedData = map(
    performances,
    ({ id, title, evaluator, createdAt }) => {
      const actions = (
        <>
          <ActionRouterButton
            to={`/review/${employeeId}/edit/${id}`}
            title="Edit Review"
            icon="edit"
          />
        </>
      );
      const created = moment(createdAt).format("MM/DD/YYYY");
      const fullName =
        get(evaluator, "firstName", "") + " " + get(evaluator, "lastName", "");
      const formattedTitle = title.replaceAll("_", " ");
      return {
        id,
        formattedTitle,
        fullName,
        created,
        actions,
      };
    }
  );

  return (
    <>
      <Title text="Performance Reviews" />
      <Table
        data={mappedData}
        loading={loading}
        colmuns={[
          {
            label: "Title",
            field: "formattedTitle",
          },
          {
            label: "Evaluator",
            field: "fullName",
          },
          {
            label: "Created On",
            field: "created",
          },
          {
            label: "Edit",
            field: "actions",
          },
        ]}
      />
    </>
  );
};
