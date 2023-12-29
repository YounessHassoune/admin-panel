import { BusinessOverview } from "@/components/business-overview";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersOverview } from "@/components/users-overview";

export default function Dashboard() {
  return (
    <div className="flex-1 w-full space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Card className="col-auto">
          <CardHeader className="flex md:flex-row justify-between items-center ">
            <CardTitle>Business</CardTitle>
            <CalendarDateRangePicker />
          </CardHeader>
          <CardContent className="pl-2">
            <BusinessOverview />
          </CardContent>
        </Card>
        <Card className="col-auto">
          <CardHeader className="">
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <UsersOverview />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
