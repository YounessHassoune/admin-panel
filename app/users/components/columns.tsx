"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "../data/schema";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { format } from "date-fns";
import { DeleteAlert } from "@/components/delete-alert";
import { deleteUser } from "@/actions/delete-user";
import useAdmin from "@/hooks/use-admin";


export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px] truncate">{row.getValue("id")}</div>
    ),
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <span className="truncate font-medium">{row.getValue("email")}</span>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      return (
        <span className="truncate font-medium">{row.getValue("role")}</span>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "lastSignIn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Sign In" />
    ),
    cell: ({ row }) => {
      return (
        <span className="truncate font-medium">
          {row.getValue("lastSignIn")
            ? format(row.getValue("lastSignIn"), "LLL dd, y")
            : "_"}
        </span>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DeleteAlert
        onDelete={async () => {
          await deleteUser(row.getValue("id"));
        }}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete this user."
      />
    ),
  },
];
