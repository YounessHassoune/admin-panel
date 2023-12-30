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
  filterColumn: keyof TData;
  newHref: string;
}

export function DataTableToolbar<TData>({
  table,
  filterColumn,
  newHref,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const isAdmin = useAdmin();
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter User..."
          value={
            (table
              .getColumn(filterColumn.toString())
              ?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table
              .getColumn(filterColumn.toString())
              ?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {!isAdmin && (
          <Link href={newHref} className={cn(buttonVariants(), "flex gap-2")}>
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
