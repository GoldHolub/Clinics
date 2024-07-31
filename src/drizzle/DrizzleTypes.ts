import { Clinic, City, Suburb } from "./schema.js";
import { InferSelectModel } from "drizzle-orm";

export type ClinicType = InferSelectModel<typeof Clinic>;
export type CityType = InferSelectModel<typeof City>;
export type SuburbType = InferSelectModel<typeof Suburb>;