import type { EmployeeType } from "./employee.model";
import type { ClientType } from "./client.model";

export type VisitService = {
  _id: string;
  service: {
    _id: string;
    name: string;
    price: number;
    duration: number;
    category: {
      _id: string;
      displayColor: string;
    };
  };
};

export type VisitType = {
  _id: string;
  employee: EmployeeType;
  // employeeId: EmployeeType;
  // employeeId: string;
  client: ClientType;
  services: VisitService[];
  date?: string;
  time: string;
  duration: number;
  note?: string;
};

export type VisitPayload = {
  employee: string;
  time: string;
  date: string;
  duration: number;
  services: { service: string }[];
  client: string;
  note?: string;
};
