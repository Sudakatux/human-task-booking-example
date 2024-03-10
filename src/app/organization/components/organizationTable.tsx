"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Organization } from "../../models";
import Link from "next/link";

export const OrganizationTable = ({
  organizations,
  onDelete,
}: {
  organizations: Organization[];
  onDelete: (id: number | string) => void;
}) => {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      width: 150,
      renderCell: (params) => (
        <Link href={`/organization/${params.value}`}>{params.value}</Link>
      ),
    },
    { field: "name", headerName: "Name", width: 150 },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return <Button onClick={() => onDelete(params.row.id)}>Delete</Button>;
      },
    },
  ];
  return (
    <div style={{ height: 400, width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <Link href="/organization/new">Add New</Link>
      </div>
      <DataGrid
        rows={organizations}
        columns={columns}
        pageSizeOptions={[5]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
      />
    </div>
  );
};
