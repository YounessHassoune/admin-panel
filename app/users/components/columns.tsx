"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "../data/schema";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { TrashIcon } from "lucide-react";
import { format } from "date-fns";
import { DeleteAlert } from "@/components/delete-alert";

export const columns: ColumnDef<User>[] = [
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
          {format(row.getValue("lastSignIn"), "LLL dd, y")}
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
        onDelete={()=>{
          console.log("deleting the user",row.getValue("email"))
        }}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete this user."
      />
    ),
  },
];
