"use client";

import { BusinessOverview } from "@/components/business-overview";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersOverview } from "@/components/users-overview";
import { Count } from "@/constants";
import { endOfMonth, startOfMonth } from "date-fns";
import React from "react";
import { DateRange } from "react-day-picker";

interface ChartsProps {
  usersOverview: Count[];
}

export function Charts({ usersOverview }: ChartsProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  });
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <Card className="col-auto overflow-x-auto">
        <CardHeader className="flex lg:flex-row lg:items-center justify-between gap-3 md:gap-2">
          <CardTitle>Business</CardTitle>
          <CalendarDateRangePicker date={date} setDate={setDate}  className=""/>
        </CardHeader>
        <CardContent className="pl-2">
          <BusinessOverview date={date} />
        </CardContent>
      </Card>
      <Card className="col-auto">
        <CardHeader className="">
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <UsersOverview data={usersOverview} />
        </CardContent>
      </Card>
    </div>
  );
}
