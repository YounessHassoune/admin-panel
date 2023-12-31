"use client";

import { createClient } from "@/lib/supabase/client";
import { addDays, differenceInDays } from "date-fns";
import { format } from "date-fns";
import React, { useEffect } from "react";
import { DateRange } from "react-day-picker";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface BusinessOverviewProps {
  date: DateRange | undefined;
}
export function BusinessOverview({ date }: BusinessOverviewProps) {
  const [data, setData] = React.useState<
    { date: string; business: number | undefined }[]
  >([]);

  const supabase = createClient();

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase
        .from("business")
        .select("*")
        .filter("created_at", "gte", date?.from?.toISOString())
        .filter("created_at", "lte", date?.to?.toISOString());
      console.log({ data });

      const daysDifference = differenceInDays(date?.to!, date?.from!);
      console.log(daysDifference);

      const businessCountArray = Array.from(
        {
          length: daysDifference + 1,
        },
        (_, index) => {
          const currentDate = addDays(date?.from!, index);
          const currentDateISO = format(currentDate, "yyyy-MM-dd");
          const count = data?.filter(
            (item) => item.created_at.split("T")[0] === currentDateISO
          ).length;
          return { date: format(currentDateISO, "dd"), business: count };
        }
      );
      setData(businessCountArray);
    };
    getData();
  }, [date]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={400}
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="business"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
