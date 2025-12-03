import type { VisitType } from "../../model/visit.model";

export type VisitProps = {
  visit: VisitType;
  visits: VisitType[];
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};
