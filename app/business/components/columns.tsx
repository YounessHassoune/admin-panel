"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { DeleteAlert } from "@/components/delete-alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Business } from "../data/schema";
import { deleteBusiness } from "@/actions/delete-business";

export const columns: ColumnDef<Business>[] = [
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
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => {
      return (
        <Avatar className="w-10 h-10">
          <AvatarImage src={row.getValue("image")} />
          <AvatarFallback>
            {row.original.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <span className="truncate font-medium">{row.getValue("name")}</span>
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
          await deleteBusiness(row.getValue("id"));
        }}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete this Business."
      />
    ),
  },
];
