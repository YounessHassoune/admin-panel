import { TypeOf, z } from "zod";

export const Role = z.enum(["Admin", "SuperAdmin"]);

export type RoleType = TypeOf<typeof Role>;

export interface UsersOverviewProps {
  data: Count[];
}

export interface Count {
  name: RoleType;
  value: number;
}

export type ShapeProps = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: any; // Type it based on your payload structure
  percent: number;
  value: number;
};


