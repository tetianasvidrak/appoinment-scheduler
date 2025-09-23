import type { EmployeeType } from "../../model/employee.model";
import type { ServiceType } from "../../model/service.model";
import type { ClientType } from "../../model/client.model";
import type { ModalState } from "../Modal/index.model";

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
    services: ServiceType[],
    client: ClientType,
    notes: string
  ) => void;
  clients: ClientType[];
  onClose: () => void;
};
