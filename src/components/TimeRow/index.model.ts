import type { EmployeeType } from "../../model/employee.model";
import type { VisitType } from "../../model/visit.model";

export type TimeRowProps = {
  time: string;
  employees: EmployeeType[];
  visits: VisitType[];
};
