import type { ModalState } from "../Modal/index.model";
import type { EmployeeType } from "../../model/employee.model";
import type { ServiceType } from "../../model/service.model";

export interface AddVisitModalState extends ModalState {
  type: "add";
}

export type AddVisitModalProps = {
  employees: EmployeeType[];
  modal: AddVisitModalState;
  addVisit: (
    employeeId: string,
    time: string,
    duration: number,
    services: ServiceType[]
  ) => void;
  onClose: () => void;
};
