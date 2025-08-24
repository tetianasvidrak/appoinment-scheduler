import type { EmployeeType } from "../../model/employee.model";
import type { ModalState } from "../Modal/index.model";

export interface EditVisitModalState extends ModalState {
  type: "edit";
}

export type EditVisitModalProps = {
  employees: EmployeeType[];
  modal: EditVisitModalState;
};
