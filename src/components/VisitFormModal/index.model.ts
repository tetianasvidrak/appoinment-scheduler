import type { EmployeeType } from "../../model/employee.model";
import type { ClientType } from "../../model/client.model";
import type { VisitFormType } from "../Scheduler/index.model";

export interface VisitFormModalProps {
  mode: "create" | "edit";
  employees: EmployeeType[];
  clients: ClientType[];
  id?: string;
  modal: { employeeId: string; time: string };
  onClose: () => void;
  onSubmit: (data: VisitFormType) => void;

  initialData?: {
    id: string;
    services: {
      _id: string;
      name: string;
      price: number;
      duration: number;
    }[];
    client: string;
    note: string;
  };
}
