import type { VisitType } from "../../model/visit.model";

export type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  text?: string;
};

export type ModalState =
  | {
      type: "edit";
      employeeId: string;
      time: string;
      visit: VisitType;
    }
  | { type: "create"; employeeId: string; time: string; visit?: VisitType };
