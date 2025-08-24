import { timeToMinutes } from "../../helpers/time";
import type { VisitType } from "../../model/Visit.model";

export const isSlotOccupied = (
  visits: VisitType[],
  employeeId: string,
  time: string
) => {
  const slotMinutes = timeToMinutes(time);
  return visits.some((v) => {
    if (v.employeeId !== employeeId) return false;
    const visitStart = timeToMinutes(v.time);
    const visitEnd = visitStart + v.duration;
    return slotMinutes >= visitStart && slotMinutes < visitEnd;
  });
};
