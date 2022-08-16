import { ORIGIN } from "../enums/origin.enum";

export interface ExampleDTO {
  foo: string;
  origin: ORIGIN;
  startedAt?: Date;
  date: Date;
}
