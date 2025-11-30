import type { VisitType } from "../../model/visit.model";

export type TooltipVisitProps = {
  targetRef: React.RefObject<HTMLElement | null>;
  offset?: number;
  visit: VisitType;
  totalPrice: number;
};
