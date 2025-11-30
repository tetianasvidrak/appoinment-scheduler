import type { VisitType } from "../../model/visit.model";

export type TimeSlotProps = {
  visits: VisitType[];
  employeeId: string;
  time: string;
  occupied?: boolean;
  onClick: () => void;
  children: React.ReactNode;
};
