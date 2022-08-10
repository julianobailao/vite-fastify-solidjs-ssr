export enum ORIGIN {
  CLIENT = "client",
  SERVER = "server",
}

export interface ExampleDTO {
  foo: string;
  origin: ORIGIN;
}
