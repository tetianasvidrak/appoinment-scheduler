import type { ModalState } from "../Modal/index.model";
import type { Employee } from "../Scheduler/index.model";

export interface AddVisitModalState extends ModalState {
  type: "add";
}

export type AddVisitModalProps = {
  employees: Employee[];
  modal: AddVisitModalState;
  addVisit: (employeeId: string, time: string, duration: number) => void;
  duration: number;
  onClose: () => void;
};
