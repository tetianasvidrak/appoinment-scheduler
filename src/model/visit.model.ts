import type { ServiceType } from "./service.model";

export type VisitType = {
  id: string;
  employeeId: string;
  clientId?: string;
  date?: string;
  time: string;
  duration: number;
  notes?: string;
  services: ServiceType[];
};
