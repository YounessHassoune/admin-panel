"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { XIcon, UserPlusIcon } from "lucide-react";
import { DataTableViewOptions } from "@/components/data-table-view-options";
import Link from "next/link";
import { cn } from "@/lib/utils";
import useAdmin from "@/hooks/use-admin";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function UserTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const isAdmin = useAdmin();

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col justify-center  max-w-fit space-y-2 md:space-y-0 md:flex-row md:space-x-2">
        <Input
          placeholder="Filter Users ..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="h-10 w-[150px] lg:w-[250px]"
        />

        {!isAdmin && (
          <Link
            href="/users/new"
            className={cn(buttonVariants(), "flex gap-2 m-0")}
          >
            <UserPlusIcon className=" h-4 w-4" />
            New User
          </Link>
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <XIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
