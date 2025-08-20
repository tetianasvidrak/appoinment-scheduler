import type { Employee } from "../Scheduler/index.model";
import type { ModalState } from "../Modal/index.model";

export interface EditVisitModalState extends ModalState {
  type: "edit";
}

export type EditVisitModalProps = {
  employees: Employee[];
  modal: EditVisitModalState;
};
