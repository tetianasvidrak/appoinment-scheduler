import type { VisitType } from "../../model/Visit.model";

export type VisitProps = {
  visit: VisitType;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};
