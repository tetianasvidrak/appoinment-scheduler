import { Dayjs } from "dayjs";
import type { ServiceType } from "../../model/service.model";

export type SchedulerProps = {
  date: Dayjs | null;
};

export type VisitFormType =
  | {
      mode: "create";
      id?: undefined;
      services: ServiceType[];
      client: string;
      note: string;
      employeeId: string;
      duration: number;
      time: string;
    }
  | {
      mode: "edit";
      id: string;
      services: ServiceType[];
      client: string;
      note: string;
      employeeId: string;
      duration: number;
      time: string;
    };
