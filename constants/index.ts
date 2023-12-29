import { TypeOf, z } from "zod";

export const Role = z.enum(['Admin', 'SuperAdmin']);

export type RoleType = TypeOf<typeof Role>;
