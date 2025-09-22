import type { EmployeeType } from "./employee.model";
import type { ClientType } from "./client.model";

export type VisitService = {
  _id: string;
  category: {
    _id: string;
    displayColor: string;
  };
  service: {
    _id: string;
    name: string;
    price: number;
    duration: number;
  };
};

export type VisitType = {
  _id: string;
  employeeId: EmployeeType;
  client: ClientType;
  services: VisitService[];
  date?: string;
  time: string;
  duration: number;
  notes?: string;
};
