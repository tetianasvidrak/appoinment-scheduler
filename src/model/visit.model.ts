import type { ServiceType } from "./service.model";

export type VisitType = {
  id: string;
  employeeId: string;
  time: string;
  duration: number;
  services: ServiceType[];
};
